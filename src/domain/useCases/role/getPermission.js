"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPermissions = void 0;
class GetAllPermissions {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.GetAllPermissions();
    }
}
exports.GetAllPermissions = GetAllPermissions;
