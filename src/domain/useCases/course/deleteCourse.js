"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourse = void 0;
class DeleteCourse {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.deleteById(id);
    }
}
exports.DeleteCourse = DeleteCourse;
