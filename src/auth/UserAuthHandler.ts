import * as uuid from 'uuid';
import { PlayerQueue } from '../queue/PlayerQueue';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';

interface IUserDetails { name: string; queue: string; }

class UserAuthHandler {

    private authedUsers: {[token: string]: IUserDetails} = {};

    public authenticateNewUser(queue: string, name: string): string {
        if (!playerQueuesManager.queueExistsForKey(queue)) {
            throw new Error('Invalid key');
        }
        const token = reformatToken(uuid.v4());
        this.authedUsers[token] = {
            name: name,
            queue: queue,
        };
        return token;
    }

    public validateToken(token: string): boolean {
        if (token && this.getUser(token)) {
            return true;
        }
        return false;
    }

    public getNameForToken(token: string): string|undefined {
        return this.getUser(token).name;
    }

    public getQueueForToken(token: string): PlayerQueue|undefined {
        const user = this.getUser(token);
        return user ? playerQueuesManager.getPlayerQueueForKey(user.queue) : undefined;
    }

    private getUser(token?: string): IUserDetails|undefined {
        token = reformatToken(token);
        return token ? this.authedUsers[token] : undefined;
    }
}

function reformatToken(token?: string): string|undefined {
    if (!token) {
        return undefined;
    }
    const formattedToken = token.toLowerCase();
    if (/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(formattedToken)) {
        return formattedToken;
    } else if (/^[0-9a-f]{32}$/.test(formattedToken)) {
        return formattedToken.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
    } else {
        throw new Error(`Unable to reformat invalid UUID: ${token}`);
    }
}

export const userAuthHandler = new UserAuthHandler();
