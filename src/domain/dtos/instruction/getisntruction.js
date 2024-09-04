"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInstruction = void 0;
class GetInstruction {
    constructor(subject_id, academic_term_id, professor_id) {
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.professor_id = professor_id;
    }
    static CreateDTO(object) {
        let errorarray = [];
        let { subject_id, academic_term_id, professor_id } = object;
        if (subject_id != undefined) {
            subject_id = Number(subject_id);
            if (Number.isNaN(subject_id) || !Number.isInteger(subject_id) || subject_id < 0) {
                errorarray.push("subject id must be a non-negative integer");
            }
        }
        if (academic_term_id != undefined) {
            academic_term_id = Number(academic_term_id);
            if (Number.isNaN(academic_term_id) || !Number.isInteger(academic_term_id) || academic_term_id < 0) {
                errorarray.push("academic term id must be a non-negative integer");
            }
        }
        if (professor_id != undefined) {
            if (!/^(V|E)-\d{1,18}$/.test(professor_id))
                errorarray.push("professor ID follows this format: V-xxxxxx ");
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new GetInstruction(subject_id, academic_term_id, professor_id)];
    }
}
exports.GetInstruction = GetInstruction;
