import * as uuid from 'uuid';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';
import { PlayerQueue } from '../queue/PlayerQueue';

type UserDetails = {name: string, queue: string};

class UserAuthHandler {

    private authedUsers: {[token: string]: UserDetails} = {};

    public authenticateNewUser(queue: string, name: string): string {
        if (!playerQueuesManager.queueExists(queue)) {
            throw new Error('Invalid key');
        }
        const token = reformatToken(uuid.v4());
        this.authedUsers[token] = {name, queue};
        return token;
    }

    public validateToken(token: string): boolean {
        if(token && this.getUser(token)) {
            return true;
        }
        return false;
    }

    public getNameForToken(token: string): string|undefined {
        return this.getUser(token).name;
    }

    public getQueueForToken(token: string): PlayerQueue|undefined {
        const user = this.getUser(token);
        return user ? playerQueuesManager.getPlayerQueue(user.queue) : undefined;
    }

    private getUser(token?: string): UserDetails|undefined {
        token = reformatToken(token);
        return token ? this.authedUsers[token] : undefined;
    }
}

function reformatToken(token?: string): string|undefined {
    if (!token) {
        return undefined;
    }
    let formattedToken = token.toLowerCase();
    if (/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(formattedToken)) {
        return formattedToken;
    } else if (/^[0-9a-f]{32}$/.test(formattedToken)) {
        return formattedToken.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
    } else {
        throw new Error(`Unable to reformat invalid UUID: ${token}`)
    }
}

export const userAuthHandler = new UserAuthHandler();
