"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInstructor = void 0;
class CreateInstructor {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateInstructor = CreateInstructor;
