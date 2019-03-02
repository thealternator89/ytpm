class EnvUtil {
    public getServerPort(defaultValue: number): number {
        return parseInt(process.env.PORT, 10) || defaultValue;
    }

    public getYouTubeApiKey(): string {
        return process.env.YOUTUBE_AUTH_TOKEN;
    }
}

export const envUtil = new EnvUtil();
