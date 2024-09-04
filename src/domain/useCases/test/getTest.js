"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTest = void 0;
class GetTest {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.get(dto);
    }
}
exports.GetTest = GetTest;
