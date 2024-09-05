"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAcademicTermByEnrollment = void 0;
class GetAcademicTermByEnrollment {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.getAcademicTermByEnrollment(dto);
    }
}
exports.GetAcademicTermByEnrollment = GetAcademicTermByEnrollment;
