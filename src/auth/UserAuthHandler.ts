import * as randomstring from 'randomstring';
import * as uuid from 'uuid';

class UserAuthHandler {

    private readonly preSharedKey: string = this.generatePreSharedKey();
    private authedUsers: {[token: string]: string} = {};

    public getPreSharedKey() : string {
        return this.preSharedKey;
    }

    public authenticateNewUser(providedKey: string, name: string): string {
        if (providedKey.toUpperCase() !== this.preSharedKey) {
            throw new Error('Invalid key');
        }
        const token = uuid.v4();
        this.authedUsers[token] = name;
        return token;
    }

    public validateToken(token: string): boolean {
        if(token && this.authedUsers[token]) {
            return true;
        }
        return false;
    }

    private generatePreSharedKey(): string {
        return randomstring.generate({
            length: 6,
            readable: true,
            charset: 'alphanumeric',
            capitalization: 'uppercase'
        });
    }
}

export const userAuthHandler = new UserAuthHandler();