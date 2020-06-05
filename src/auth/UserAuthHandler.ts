import * as randomstring from 'randomstring';
import { PlayerQueue } from '../queue/PlayerQueue';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';

const TOKEN_LENGTH = 8;
const MAX_TOKEN_GENERATION_ATTEMPTS = 5;

interface IUserDetails { name: string; queue: string; }

class UserAuthHandler {

    private authedUsers: {[token: string]: IUserDetails} = {};

    public authenticateNewUser(queue: string, name: string): string {
        if (!playerQueuesManager.queueExistsForKey(queue)) {
            throw new Error('Invalid key');
        }

        const token = this.generateToken();
        this.authedUsers[token] = {
            name: name,
            queue: queue,
        };
        return token;
    }

    public revokeToken(token: string): void {
        delete this.authedUsers[token];
    }

    public validateToken(token?: string): boolean {
        return !!this.getUser(token);
    }

    public getNameForToken(token: string): string|undefined {
        return this.getUser(token).name;
    }

    public getQueueForToken(token: string): PlayerQueue|undefined {
        const user = this.getUser(token);
        return user ? playerQueuesManager.getPlayerQueueForKey(user.queue) : undefined;
    }

    private getUser(token?: string): IUserDetails|undefined {
        return token ? this.authedUsers[token] : undefined;
    }

    private generateToken(): string {
        for (let i = 0; i < MAX_TOKEN_GENERATION_ATTEMPTS; i++) {
            const generated = randomstring.generate({
                capitalization: 'lowercase',
                charset: 'alphanumeric',
                length: TOKEN_LENGTH,
                readable: false,
            });

            if (!this.authedUsers[generated]) {
                return generated;
            }
        }
        throw new Error(`Failed to generate a new unique token after ${MAX_TOKEN_GENERATION_ATTEMPTS} attempts`);
    }
}

export const userAuthHandler = new UserAuthHandler();
