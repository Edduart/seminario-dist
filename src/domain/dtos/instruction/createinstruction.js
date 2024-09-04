"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInstruction = void 0;
class CreateInstruction {
    constructor(subject_id, academic_term_id, professor_id) {
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.professor_id = professor_id;
    }
    static CreateDTO(object) {
        let errorarray = [];
        let { subject_id, academic_term_id, professor_id } = object;
        if (Number.isNaN(subject_id) || !Number.isInteger(subject_id) || subject_id < 0) {
            errorarray.push("subject id must be a non-negative integer");
        }
        if (Number.isNaN(academic_term_id) || !Number.isInteger(academic_term_id) || academic_term_id < 0) {
            errorarray.push("academic term id must be a non-negative integer");
        }
        if (professor_id != undefined) {
            if (!/^(V|E)-\d{1,18}$/.test(professor_id))
                errorarray.push("professor ID follows this format: V-xxxxxx ");
        }
        else {
            professor_id = null;
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new CreateInstruction(subject_id, academic_term_id, professor_id)];
    }
}
exports.CreateInstruction = CreateInstruction;
