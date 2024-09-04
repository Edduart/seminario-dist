"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSubjectAllowToEnrollEquivalency = void 0;
class GetSubjectAllowToEnrollEquivalency {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.getSubjectsToEnroll(dto);
    }
}
exports.GetSubjectAllowToEnrollEquivalency = GetSubjectAllowToEnrollEquivalency;
