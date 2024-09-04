"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProfessor = void 0;
class DeleteProfessor {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.delete(id);
    }
}
exports.DeleteProfessor = DeleteProfessor;
