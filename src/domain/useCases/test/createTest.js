"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTest = void 0;
class CreateTest {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateTest = CreateTest;
