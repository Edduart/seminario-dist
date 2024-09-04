"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestScore = void 0;
class UpdateTestScore {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.update(dto);
    }
}
exports.UpdateTestScore = UpdateTestScore;
