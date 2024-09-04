"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessorUseCase = void 0;
class CreateProfessorUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateProfessorUseCase = CreateProfessorUseCase;
