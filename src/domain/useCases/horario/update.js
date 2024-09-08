"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioUpdateUseCase = void 0;
class HorarioUpdateUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.updateById(data);
    }
}
exports.HorarioUpdateUseCase = HorarioUpdateUseCase;
