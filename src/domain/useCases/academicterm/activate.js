"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateAcademicTermUseCase = void 0;
class ActivateAcademicTermUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.ActivateAcademicTerm(id);
    }
}
exports.ActivateAcademicTermUseCase = ActivateAcademicTermUseCase;
