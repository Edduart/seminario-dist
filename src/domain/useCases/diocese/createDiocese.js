"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiocese = void 0;
class CreateDiocese {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateDiocese = CreateDiocese;
