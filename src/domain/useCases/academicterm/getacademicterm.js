"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAcademicTermUseCase = void 0;
class GetAcademicTermUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.Get(data);
    }
}
exports.GetAcademicTermUseCase = GetAcademicTermUseCase;
