"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiocese = void 0;
class UpdateDiocese {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.updateById(dto);
    }
}
exports.UpdateDiocese = UpdateDiocese;
