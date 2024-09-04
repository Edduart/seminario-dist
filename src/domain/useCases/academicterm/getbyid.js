"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetbyidAcademicTermUseCase = void 0;
class GetbyidAcademicTermUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.GetByID(data);
    }
}
exports.GetbyidAcademicTermUseCase = GetbyidAcademicTermUseCase;
