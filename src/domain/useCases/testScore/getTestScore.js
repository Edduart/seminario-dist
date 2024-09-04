"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestScore = void 0;
class GetTestScore {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.get(dto);
    }
}
exports.GetTestScore = GetTestScore;
