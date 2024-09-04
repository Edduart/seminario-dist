"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourse = void 0;
class CreateCourse {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateCourse = CreateCourse;
