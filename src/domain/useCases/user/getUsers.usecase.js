"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsers = void 0;
class GetUsers {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getAll();
    }
}
exports.GetUsers = GetUsers;
