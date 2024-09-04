"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersByType = void 0;
class GetUsersByType {
    constructor(repository) {
        this.repository = repository;
    }
    execute(type) {
        return this.repository.getByType(type);
    }
}
exports.GetUsersByType = GetUsersByType;
