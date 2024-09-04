"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentStatus = exports.EnrollmentEntity = void 0;
class EnrollmentEntity {
    constructor(seminarian_id, subject_id, academic_term_id, status) {
        this.seminarian_id = seminarian_id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.status = status;
    }
    static fromObject(object) {
        const { seminarian_id, subject_id, academic_term_id, status } = object;
        if (!seminarian_id)
            throw "Id is required";
        if (!subject_id)
            throw "subject ID is required";
        if (!academic_term_id)
            throw "Academic term is required";
        if (!status)
            throw "status is required";
        return new EnrollmentEntity(seminarian_id, subject_id, academic_term_id, status);
    }
}
exports.EnrollmentEntity = EnrollmentEntity;
var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["CURSANDO"] = "CURSANDO";
    EnrollmentStatus["APROBADO"] = "APROBADO";
    EnrollmentStatus["REPROBADO"] = "REPROBADO";
    EnrollmentStatus["RETIRADO"] = "RETIRADO";
})(EnrollmentStatus || (exports.EnrollmentStatus = EnrollmentStatus = {}));
