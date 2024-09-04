"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRole = void 0;
class CreateRole {
    constructor(repository) {
        this.repository = repository;
    }
    execute(sper) {
        return this.repository.create(sper);
    }
}
exports.CreateRole = CreateRole;
