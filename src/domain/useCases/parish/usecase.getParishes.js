"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getparishes = void 0;
class Getparishes {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getAll();
    }
}
exports.Getparishes = Getparishes;
