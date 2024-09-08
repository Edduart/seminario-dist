"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContarEnrollsUseCase = void 0;
class ContarEnrollsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.ContarEnrolls();
    }
}
exports.ContarEnrollsUseCase = ContarEnrollsUseCase;
