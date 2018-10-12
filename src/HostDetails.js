"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ip = require("ip");
class HostDetails {
    static getHost() {
        return ip.address();
    }
    static getPort() {
        return 8080;
    }
}
exports.HostDetails = HostDetails;
