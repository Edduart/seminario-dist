"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestForTestScore = void 0;
class GetTestForTestScore {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.getTestForTestScore(dto);
    }
}
exports.GetTestForTestScore = GetTestForTestScore;
