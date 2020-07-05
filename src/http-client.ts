import { AuthenticatedUser, getAuthenticatedUser } from './models/AuthenticatedUser';
import { default as version } from './version';

export async function httpGet<T>(
    path: string,
    authenticatedUser: AuthenticatedUser | null = null
): Promise<{ success: boolean; data: T | null }> {
    if (authenticatedUser === null) authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser === null) {
        console.error('HTTP request made without credentials');
        return { success: false, data: null };
    }
    const options: RequestInit = {
        method: 'GET',
        headers: {
            Authorization:
                authenticatedUser.username !== null && authenticatedUser.password !== null
                    ? 'Basic ' +
                      Buffer.from(authenticatedUser.username + ':' + authenticatedUser.password).toString('base64')
                    : '',
            'User-Agent': 'rabbitmq-management-ui/' + version
        },
        credentials: 'include'
    };
    const response: Response = await fetch(path, options);
    const text: string = await response.text();
    const data: T = text && JSON.parse(text);
    if (response.status >= 200 && response.status < 300) return { success: true, data: data };
    return { success: false, data: null };
}
