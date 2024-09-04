"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicTermUseCase = void 0;
class updateAcademicTermUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.Update(id);
    }
}
exports.updateAcademicTermUseCase = updateAcademicTermUseCase;
