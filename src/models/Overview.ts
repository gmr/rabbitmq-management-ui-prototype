import { httpGet } from '../http-client';

export interface Overview {
    churn_rates: {
        channel_closed: number;
        channel_closed_details: { rate: number };
        channel_created: number;
        channel_created_details: { rate: number };
        connection_closed: number;
        connection_closed_details: { rate: number };
        connection_created: number;
        connection_created_details: { rate: number };
        queue_created: number;
        queue_created_details: { rate: number };
        queue_declared: number;
        queue_declared_details: { rate: number };
        queue_deleted: number;
        queue_deleted_details: { rate: number };
    };
    cluster_name: string;
    contexts: Array<{
        ssl_opts: Array<string>;
        node: string;
        description: string;
        path: string;
        cowboy_opts: string;
        port: number;
    }>;
    disable_stats: boolean;
    enable_queue_totals: boolean;
    erlang_full_version: string;
    erlang_version: string;
    exchange_types: Array<{ name: string; description: string; enabled: boolean }>;
    listeners: Array<{
        node: string;
        protocol: string;
        ip_address: string;
        port: number;
        socket_opts: {
            backlog: number;
            nodelay: boolean;
            linger: [boolean, number];
            exit_on_close: boolean;
        };
    }>;
    management_version: string;
    message_stats: Record<string, number>;
    node: string;
    object_totals: {
        channels: number;
        connections: number;
        consumers: number;
        exchanges: number;
        queues: number;
    };
    product_name: string;
    product_version: string;
    queue_totals: Record<string, number>;
    rabbitmq_version: string;
    rates_mode: 'none' | 'basic' | 'detailed';
    sample_retention_policies: {
        global: Array<number>;
        basic: Array<number>;
        detailed: Array<number>;
    };
    statistics_db_event_queue: number;
    statistics_db_node: string;
}

export async function getOverview(): Promise<Overview | null> {
    const result = await httpGet<Overview>('/api/overview');
    return result.data;
}
