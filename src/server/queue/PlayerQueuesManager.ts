import { PlayerQueue } from './PlayerQueue';

import * as moment from 'moment';
import * as randomstring from 'randomstring';
import uuid = require('uuid');

const QUEUE_KEY_LENGTH_CHARS = 5;
const MAX_KEY_GENERATION_ATTEMPTS = 10;

class PlayerQueuesManager {
    private playerQueues: {[key: string]: PlayerQueue} = {};
    private playerQueueMap: {[token: string]: PlayerQueue} = {};

    public getPlayerQueueForKey(key: string): PlayerQueue {
        // toUpperCase as generatePreSharedKey generates an upper case string.
        return this.playerQueues[key.toUpperCase()];
    }

    public queueExistsForKey(key: string): boolean {
        return !!this.getPlayerQueueForKey(key);
    }

    public getPlayerQueueForToken(token: string): PlayerQueue {
        return this.playerQueueMap[token];
    }

    public queueExistsForToken(token: string): boolean {
        return !!this.getPlayerQueueForToken(token);
    }

    public getAllQueueKeys(): string[] {
        return Object.keys(this.playerQueues);
    }

    public createNewPlayerQueue(): PlayerQueue {
        // Iterate to generate a new key, allowing us to avoid collision.
        // If we collide 10 times, we should just throw an error - This can only occur with more than 30K queues
        for (let i = 0; i < MAX_KEY_GENERATION_ATTEMPTS; i++) {
            const newKey = generatePreSharedKey();
            if (!this.playerQueues[newKey]) {
                const playerToken = uuid.v4();
                const queue = new PlayerQueue(newKey, playerToken);
                this.playerQueues[newKey] = queue;
                this.playerQueueMap[playerToken] = queue;
                return queue;
            }
        }
        throw new Error(`Failed to generate a key after ${MAX_KEY_GENERATION_ATTEMPTS} attempts`);
    }

    public cleanUpOldPlayerQueues(): void {
        for (const queueKey in this.playerQueues) {
            if (!this.playerQueues.hasOwnProperty(queueKey)) {
                continue;
            }
            const timeSinceTouched = moment.duration(moment().diff(this.playerQueues[queueKey].getTimeLastTouched()));
            if (timeSinceTouched.asHours() > 12) {
                delete this.playerQueues[queueKey];
            }
        }
    }

    public numQueues(): number {
        return Object.keys(this.playerQueues).length;
    }
}

function generatePreSharedKey(): string {
    return randomstring.generate({
        capitalization: 'uppercase',
        charset: 'alphanumeric',
        length: QUEUE_KEY_LENGTH_CHARS,
        readable: true,
    });
}

export const playerQueuesManager = new PlayerQueuesManager();
