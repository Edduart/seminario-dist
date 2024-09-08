"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRepositoryImpl = void 0;
class EnrollmentRepositoryImpl {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    ContarEnrolls() {
        return this.dataSource.ContarEnrolls();
    }
    getAcademicTermByEnrollment(dto) {
        return this.dataSource.getAcademicTermByEnrollment(dto);
    }
    getSubjectsToEnroll(dto) {
        return this.dataSource.getSubjectsToEnroll(dto);
    }
    createByEquivalence(dto) {
        return this.dataSource.createByEquivalence(dto);
    }
    updateStageIfApproved() {
        return this.dataSource.updateStageIfApproved();
    }
    updateStatusByFinalSubjectScore() {
        return this.dataSource.updateStatusByFinalSubjectScore();
    }
    getStageOfSeminarian(dto) {
        return this.dataSource.getStageOfSeminarian(dto);
    }
    getAcademicStatus(dto) {
        return this.dataSource.getAcademicStatus(dto);
    }
    create(dto) {
        return this.dataSource.create(dto);
    }
    get(dto) {
        return this.dataSource.get(dto);
    }
    update(dto) {
        return this.dataSource.update(dto);
    }
    delete(id) {
        return this.dataSource.delete(id);
    }
}
exports.EnrollmentRepositoryImpl = EnrollmentRepositoryImpl;
