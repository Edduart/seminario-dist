"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInstructor = void 0;
class GetInstructor {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetInstructor = GetInstructor;
