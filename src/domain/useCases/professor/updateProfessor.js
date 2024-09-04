"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfessor = void 0;
class UpdateProfessor {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.update(dto);
    }
}
exports.UpdateProfessor = UpdateProfessor;
