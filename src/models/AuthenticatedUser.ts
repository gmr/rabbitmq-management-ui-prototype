import { httpGet } from '../http-client';

export interface AuthenticatedUser {
    username: string;
    password: string;
    tags: Array<string>;
}

interface Response {
    name: string;
    tags: string;
}

export function getAuthenticatedUser(): AuthenticatedUser | null {
    const localCredentials = localStorage.getItem('credentials');
    if (localCredentials) return JSON.parse(localCredentials);
    return null;
}

export async function login(username: string, password: string): Promise<AuthenticatedUser | null> {
    const value: AuthenticatedUser = { username: username, password: password, tags: [] };
    const result = await httpGet<Response>('/api/whoami', value);
    if (!result.success || !result.data) return null;
    value.tags = result.data.tags !== null ? result.data.tags.split(',') : [];
    localStorage.setItem('credentials', JSON.stringify(value));
    return value;
}

export function logout(): void {
    localStorage.clear();
}
