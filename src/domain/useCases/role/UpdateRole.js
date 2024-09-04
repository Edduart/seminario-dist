"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRole = void 0;
class UpdateRole {
    constructor(repository) {
        this.repository = repository;
    }
    execute(nuevo) {
        return this.repository.Update(nuevo);
    }
}
exports.UpdateRole = UpdateRole;
