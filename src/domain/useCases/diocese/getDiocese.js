"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDiocese = void 0;
class GetDiocese {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetDiocese = GetDiocese;
