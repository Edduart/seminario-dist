"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDioceses = void 0;
class GetDioceses {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getAll();
    }
}
exports.GetDioceses = GetDioceses;
