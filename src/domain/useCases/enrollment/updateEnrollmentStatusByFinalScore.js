"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnrollmentStatusByFinalScore = void 0;
class UpdateEnrollmentStatusByFinalScore {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.updateStatusByFinalSubjectScore();
    }
}
exports.UpdateEnrollmentStatusByFinalScore = UpdateEnrollmentStatusByFinalScore;
