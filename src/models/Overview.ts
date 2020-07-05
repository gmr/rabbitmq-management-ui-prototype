export interface Context {
    sslOpts: Array<string>;
    node: string;
    description: string;
    path: string;
    cowboyOpts: string;
    port: number;
}

export interface Listener {
    node: string;
    protocol: string;
    ipAddress: string;
    port: number;
    socketOpts: {
        backlog: number;
        nodelay: boolean;
        linger: [boolean, number];
        exitOnClose: boolean;
    };
}

export interface Overview {
    churnRates: {
        channelClosed: number;
        channelClosedDetails: { rate: number };
        channelCreated: number;
        channelCreatedDetails: { rate: number };
        connectionClosed: number;
        connectionClosedDetails: { rate: number };
        connectionCreated: number;
        connectionCreatedDetails: { rate: number };
        queueCreated: number;
        queueCreatedDetails: { rate: number };
        queueDeclared: number;
        queueDeclaredDetails: { rate: number };
        queueDeleted: number;
        queueDeletedDetails: { rate: number };
    };
    clusterName: string;
    contexts: Array<Context>;
    disableStats: boolean;
    enableQueueTotals: boolean;
    erlangFullVersion: string;
    erlangVersion: string;
    exchangeTypes: Array<{ name: string; description: string; enabled: boolean }>;
    listeners: Array<Listener>;
    managementVersion: string;
    messageStats: Record<string, number>;
    node: string;
    objectTotals: {
        channels: number;
        connections: number;
        consumers: number;
        exchanges: number;
        queues: number;
    };
    queueTotals: Record<string, number>;
    rabbitmqVersion: string;
    rates_mode: 'none' | 'basic' | 'detailed';
    sampleRetentionPolicies: {
        global: Array<number>;
        basic: Array<number>;
        detailed: Array<number>;
    };
    statisticsDbEventQueue: number;
    statisticsDbNode: string;
}

interface Response {
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
    contexts: Array<Context>;
    disable_stats: boolean;
    enable_queue_totals: boolean;
    erlang_full_version: string;
    erlang_version: string;
    exchange_types: Array<{ name: string; description: string; enabled: boolean }>;
    listeners: Array<Listener>;
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
