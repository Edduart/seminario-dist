"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restart_use = void 0;
class Restart_use {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.RestartPassword(id);
    }
}
exports.Restart_use = Restart_use;
