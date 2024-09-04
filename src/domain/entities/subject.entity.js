"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectEntity = void 0;
const academic_field_1 = require("./academic.field");
class SubjectEntity {
    constructor(id, course_id, description, status, precedent, semester, academic_field_id, homologada) {
        this.id = id;
        this.course_id = course_id;
        this.description = description;
        this.status = status;
        this.precedent = precedent;
        this.semester = semester;
        this.academic_field_id = academic_field_id;
        this.homologada = homologada;
    }
    static fromObject(object) {
        const { id, course_id, description, status, subject, semester, academic_field, homologada } = object;
        const academic_obj = academic_field_1.academicFieldEntity.fromObject(academic_field);
        let prec = null;
        if (subject != null) {
            prec = this.fromObject(subject);
        }
        return new SubjectEntity(id, course_id, description, status, prec, semester, academic_obj, homologada);
    }
}
exports.SubjectEntity = SubjectEntity;
