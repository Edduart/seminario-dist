"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEnrollmentByEquivalence = void 0;
class CreateEnrollmentByEquivalence {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.createByEquivalence(dto);
    }
}
exports.CreateEnrollmentByEquivalence = CreateEnrollmentByEquivalence;
