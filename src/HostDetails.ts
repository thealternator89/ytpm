import * as ip from 'ip';

export class HostDetails {
    public static getHost(): string {
        return ip.address();
    }

    public static getPort(): number {
        return 8080;
    }
}