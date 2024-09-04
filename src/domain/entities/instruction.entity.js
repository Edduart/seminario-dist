"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionEntity = void 0;
class InstructionEntity {
    constructor(professor_id, subject_id, academic_term_id, subject) {
        this.professor_id = professor_id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.subject = subject;
    }
    static fromObject(object) {
        let { professor_id, subject_id, academic_term_id } = object;
        return new InstructionEntity(professor_id, subject_id, academic_term_id);
    }
}
exports.InstructionEntity = InstructionEntity;
