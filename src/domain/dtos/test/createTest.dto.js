"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestDto = void 0;
class CreateTestDto {
    constructor(subject_id, academic_term_id, tests) {
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.tests = tests;
    }
    static create(props) {
        let { subject_id, academic_term_id, tests } = props;
        let validationErrors = [];
        console.log({ props });
        if (validationErrors.length > 0) {
            console.error("CreateEnrollmentDto", { validationErrors });
            return [validationErrors];
        }
        return [undefined, new CreateTestDto(subject_id, academic_term_id, tests)];
    }
}
exports.CreateTestDto = CreateTestDto;
[];
