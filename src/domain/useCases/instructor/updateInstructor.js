"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInstructor = void 0;
class UpdateInstructor {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.updateById(dto);
    }
}
exports.UpdateInstructor = UpdateInstructor;
