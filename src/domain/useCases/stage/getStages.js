"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStages = void 0;
class GetStages {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getAll();
    }
}
exports.GetStages = GetStages;
