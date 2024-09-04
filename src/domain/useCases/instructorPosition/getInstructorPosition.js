"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInstructorPosition = void 0;
class GetInstructorPosition {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetInstructorPosition = GetInstructorPosition;
