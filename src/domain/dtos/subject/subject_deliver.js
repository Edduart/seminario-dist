"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instruction_dto = exports.SubjectDeliver = void 0;
const __1 = require("../..");
class SubjectDeliver {
    constructor(id, course_id, description, status, precedent, semester, academic_field_id, homologada, instruction) {
        this.id = id;
        this.course_id = course_id;
        this.description = description;
        this.status = status;
        this.precedent = precedent;
        this.semester = semester;
        this.academic_field_id = academic_field_id;
        this.homologada = homologada;
        this.instruction = instruction;
    }
    static fromObject(object) {
        const { id, course_id, description, status, subject, semester, academic_field, homologada } = object;
        const academic_obj = __1.academicFieldEntity.fromObject(academic_field);
        let prec = null;
        if (subject != null) {
            prec = this.fromObject(subject);
        }
        return new SubjectDeliver(id, course_id, description, status, prec, semester, academic_obj, homologada);
    }
}
exports.SubjectDeliver = SubjectDeliver;
class instruction_dto {
    constructor(professor_id, subject_id, academic_term_id) {
        this.professor_id = professor_id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
    }
    static fromObject(object) {
        const { professor_id, subject_id, academic_term_id } = object;
        return new instruction_dto(professor_id, subject_id, academic_term_id);
    }
}
exports.instruction_dto = instruction_dto;
