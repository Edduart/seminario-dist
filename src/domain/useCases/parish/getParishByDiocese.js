"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByDiocese = void 0;
class GetByDiocese {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.getByDioceseId(id);
    }
}
exports.GetByDiocese = GetByDiocese;
