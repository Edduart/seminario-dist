"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStage = void 0;
class GetStage {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetStage = GetStage;
