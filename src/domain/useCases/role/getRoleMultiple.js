"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRole = void 0;
class GetRole {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id, name) {
        return this.repository.getRoleMultiple(id, name);
    }
}
exports.GetRole = GetRole;
