"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioGetUseCase = void 0;
class HorarioGetUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.get(id);
    }
}
exports.HorarioGetUseCase = HorarioGetUseCase;
