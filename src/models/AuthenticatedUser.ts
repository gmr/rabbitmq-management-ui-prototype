import { httpGet } from '../http-client';

export interface AuthenticatedUser {
    username: string;
    password: string;
    tags: Array<string>;
    vhost: string | null;
    refresh: number;
}

interface Response {
    name: string;
    tags: string;
}

export function getAuthenticatedUser(): AuthenticatedUser | null {
    const value = localStorage.getItem('authenticatedUser');
    if (value) return JSON.parse(value);
    return null;
}

export async function login(username: string, password: string): Promise<AuthenticatedUser | null> {
    const value: AuthenticatedUser = {
        username: username,
        password: password,
        tags: [],
        vhost: null,
        refresh: 0
    };
    const result = await httpGet<Response>('/api/whoami', value);
    if (!result.success || !result.data) return null;
    value.tags = result.data.tags !== null ? result.data.tags.split(',') : [];
    saveAuthenticatedUser(value);
    return value;
}

export function logout(): void {
    localStorage.clear();
}

export function saveAuthenticatedUser(user: AuthenticatedUser): void {
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
}
