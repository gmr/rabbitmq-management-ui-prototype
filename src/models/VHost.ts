import { httpGet } from '../http-client';

export interface VHost {
    cluster_state: Record<string, string>;
    description: string;
    messages: number;
    message_details: {
        rate: number;
    };
    messages_ready: number;
    messages_ready_details: { rate: number };
    messages_unacknowledged: number;
    messages_unacknowledged_details: { rate: number };
    metadata: {
        description: string;
        tags: Array<string>;
    };
    name: string;
    tags: Array<string>;
    tracing: boolean;
}

export async function getVHost(name: string): Promise<VHost | null> {
    const result = await httpGet<VHost>('/api/vhosts/' + encodeURIComponent(name));
    return result.data;
}

export async function getVHosts(): Promise<Array<VHost> | null> {
    const result = await httpGet<Array<VHost>>('/api/vhosts');
    return result.data;
}
