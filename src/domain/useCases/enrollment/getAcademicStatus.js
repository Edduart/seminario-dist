"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAcademicStatus = void 0;
class GetAcademicStatus {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.getAcademicStatus(dto);
    }
}
exports.GetAcademicStatus = GetAcademicStatus;
