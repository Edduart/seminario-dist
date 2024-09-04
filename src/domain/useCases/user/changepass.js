"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Change_use = void 0;
class Change_use {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.ChangePassword(data);
    }
}
exports.Change_use = Change_use;
