"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEnrollment = void 0;
class CreateEnrollment {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.create(dto);
    }
}
exports.CreateEnrollment = CreateEnrollment;
