"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomstring = require("randomstring");
const uuid = require("uuid");
class UserAuthHandler {
    constructor() {
        this.preSharedKey = this.generatePreSharedKey();
        this.authedUsers = {};
    }
    getPreSharedKey() {
        return this.preSharedKey;
    }
    authenticateNewUser(providedKey, name) {
        if (providedKey.toUpperCase() !== this.preSharedKey) {
            throw new Error('Invalid key');
        }
        const token = uuid.v4();
        this.authedUsers[token] = name;
        return token;
    }
    validateToken(token) {
        if (token && this.authedUsers[token]) {
            return true;
        }
        return false;
    }
    generatePreSharedKey() {
        return randomstring.generate({
            length: 6,
            readable: true,
            charset: 'alphanumeric',
            capitalization: 'uppercase'
        });
    }
}
exports.userAuthHandler = new UserAuthHandler();
