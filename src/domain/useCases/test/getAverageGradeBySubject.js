"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAverageGradeBySubject = void 0;
class GetAverageGradeBySubject {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.getAverageGradeBySubject(dto);
    }
}
exports.GetAverageGradeBySubject = GetAverageGradeBySubject;
