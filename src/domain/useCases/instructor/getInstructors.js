"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInstructors = void 0;
class GetInstructors {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getAll();
    }
}
exports.GetInstructors = GetInstructors;
