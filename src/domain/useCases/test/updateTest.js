"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTest = void 0;
class UpdateTest {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.update(dto);
    }
}
exports.UpdateTest = UpdateTest;
