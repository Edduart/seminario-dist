"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserbyId = void 0;
class GetUserbyId {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.getById(id);
    }
}
exports.GetUserbyId = GetUserbyId;
