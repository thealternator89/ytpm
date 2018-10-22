import * as uuid from 'uuid';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';
import { PlayerQueue } from '../queue/PlayerQueue';

class UserAuthHandler {

    private authedUsers: {[token: string]: {name: string, queue: string}} = {};

    public authenticateNewUser(queue: string, name: string): string {
        if (!playerQueuesManager.queueExists(queue)) {
            throw new Error('Invalid key');
        }
        const token = uuid.v4();
        this.authedUsers[token] = {name, queue};
        return token;
    }

    public validateToken(token: string): boolean {
        if(token && this.authedUsers[token]) {
            return true;
        }
        return false;
    }

    public getNameForToken(token: string): string|undefined {
        return this.authedUsers[token].name;
    }

    public getQueueForToken(token: string): PlayerQueue|undefined {
        const user = this.authedUsers[token];
        if(!user){
            return undefined;
        }
        return playerQueuesManager.getPlayerQueue(user.queue);
    }
}

export const userAuthHandler = new UserAuthHandler();