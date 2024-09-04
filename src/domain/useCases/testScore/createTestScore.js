"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestScore = void 0;
class CreateTestScore {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateTestScore = CreateTestScore;
