"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInstructionUseCase = void 0;
class GetInstructionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.Get(data);
    }
}
exports.GetInstructionUseCase = GetInstructionUseCase;
