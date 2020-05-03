export interface ChannelDiscovery {
    id: string;
    name: string;
    thumbnail: string;
}

export interface ListDiscovery extends ChannelDiscovery {
    channel: string;
}