"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCourses = void 0;
class GetCourses {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getAll();
    }
}
exports.GetCourses = GetCourses;
