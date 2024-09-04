"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAcademicTermUseCase = void 0;
class CreateAcademicTermUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateAcademicTermUseCase = CreateAcademicTermUseCase;
