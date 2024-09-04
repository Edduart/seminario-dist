"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInstructorPositions = void 0;
class GetInstructorPositions {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getAll();
    }
}
exports.GetInstructorPositions = GetInstructorPositions;
