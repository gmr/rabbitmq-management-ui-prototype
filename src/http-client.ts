import { default as version } from './version';
import { Credentials } from './models/Credentials';

export async function get<T>(path: string, credentials: Credentials): Promise<{ success: boolean; data: T | null }> {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            Authorization:
                credentials.username !== null && credentials.password !== null
                    ? 'Basic ' + Buffer.from(credentials.username + ':' + credentials.password).toString('base64')
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
