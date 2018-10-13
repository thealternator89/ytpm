"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(item) {
        this.queue.push(item);
    }
    addToFront(item) {
        this.queue.unshift(item);
    }
    dequeue(position = 0) {
        return this.queue.splice(position, 1)[0];
    }
    length() {
        return this.queue.length;
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    findPosition(videoId) {
        return this.queue.findIndex((item) => item.videoId === videoId);
    }
    getAllQueuedItems() {
        return [...this.queue];
    }
}
exports.playerQueue = new PlayerQueue();
