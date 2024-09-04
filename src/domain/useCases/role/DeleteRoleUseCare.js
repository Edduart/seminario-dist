"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRole = void 0;
class DeleteRole {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.Delete(id);
    }
}
exports.DeleteRole = DeleteRole;
