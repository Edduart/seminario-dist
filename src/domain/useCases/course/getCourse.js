"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCourse = void 0;
class GetCourse {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetCourse = GetCourse;
