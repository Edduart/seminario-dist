"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourse = void 0;
class UpdateCourse {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.updateById(dto);
    }
}
exports.UpdateCourse = UpdateCourse;
