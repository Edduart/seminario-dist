"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInstructionUseCase = void 0;
class CreateInstructionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.Create(data);
    }
}
exports.CreateInstructionUseCase = CreateInstructionUseCase;
