import { get as httpGet } from '../http-client';

export interface Credentials {
    username: string;
    password: string;
    tags: Array<string>;
}

interface WhoAmI {
    name: string;
    tags: string;
}

export async function getModel(username: string, password: string): Promise<Credentials | undefined> {
    const credentials: Credentials = { username: username, password: password, tags: [] };
    const result = await httpGet<WhoAmI>('/api/whoami', credentials);
    if (result.success && result.data !== null) {
        credentials.tags = result.data.tags !== null ? result.data.tags.split(',') : [];
        return credentials;
    }
    return undefined;
}
