"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndAcademicTermUseCase = void 0;
class EndAcademicTermUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.EndAcademicTerm(id);
    }
}
exports.EndAcademicTermUseCase = EndAcademicTermUseCase;
