"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteInstructor = void 0;
class DeleteInstructor {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.deleteById(id);
    }
}
exports.DeleteInstructor = DeleteInstructor;
