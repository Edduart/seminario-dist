"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLog = void 0;
class CreateLog {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateLog = CreateLog;
