"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfessor = void 0;
class GetProfessor {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.get(dto);
    }
}
exports.GetProfessor = GetProfessor;
