"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDiocese = void 0;
class DeleteDiocese {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.deleteById(id);
    }
}
exports.DeleteDiocese = DeleteDiocese;
