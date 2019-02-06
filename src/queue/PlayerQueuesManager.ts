import { PlayerQueue } from "./PlayerQueue";
import * as randomstring from 'randomstring';
import moment = require("moment");

const QUEUE_KEY_LENGTH_CHARS = 5;
const MAX_KEY_GENERATION_ATTEMPTS = 10;

class PlayerQueuesManager {
    private playerQueues: {[key: string]: PlayerQueue} = {};

    public getPlayerQueue(key: string): PlayerQueue {
        // toUpperCase as generatePreSharedKey generates an upper case string.
        return this.playerQueues[key.toUpperCase()];
    }

    public queueExists(key: string): boolean {
        return !!this.getPlayerQueue(key);
    }

    public getAllQueueKeys(): string[] {
        return Object.keys(this.playerQueues);
    }

    public createNewPlayerQueue(): string {
        // Iterate to generate a new key, allowing us to avoid collision.
        // If we collide 10 times, we should just throw an error. This will theoretically only occur after more than 30K queues exist.
        for (let i = 0; i < MAX_KEY_GENERATION_ATTEMPTS; i++) {
            const newKey = generatePreSharedKey();
            if (!this.playerQueues[newKey]) {
                this.playerQueues[newKey] = new PlayerQueue(newKey);
                return newKey;
            }
        }
        throw new Error(`Failed to generate a key after ${MAX_KEY_GENERATION_ATTEMPTS} attempts`);
    }

    public cleanUpOldPlayerQueues(): void {
        for (const queueKey in this.playerQueues) {
            if(!this.playerQueues.hasOwnProperty(queueKey)){
                continue;
            }
            const timeSinceTouched = moment.duration(moment().diff(this.playerQueues[queueKey].getTimeLastTouched()));
            if(timeSinceTouched.asHours() > 12){
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
        length: QUEUE_KEY_LENGTH_CHARS,
        readable: true,
        charset: 'alphanumeric',
        capitalization: 'uppercase'
    });
}

export const playerQueuesManager = new PlayerQueuesManager();
