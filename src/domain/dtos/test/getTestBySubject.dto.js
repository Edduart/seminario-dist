"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestBySubjectDto = void 0;
class GetTestBySubjectDto {
    constructor(enrollment_id, seminarian_id, subject_id, academic_term_id, status) {
        this.enrollment_id = enrollment_id;
        this.seminarian_id = seminarian_id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.status = status;
    }
    static get(props) {
        let { enrollment_id, seminarian_id, subject_id, academic_term_id, status } = props;
        let dataErrors = [];
        console.log("🚀 ~ GetEnrollmentDto ~ get ~ props:", props);
        if (enrollment_id != undefined)
            enrollment_id = +enrollment_id;
        if (subject_id != undefined)
            subject_id = +subject_id;
        if (academic_term_id != undefined)
            academic_term_id = +academic_term_id;
        if (dataErrors.length > 0)
            return [dataErrors];
        return [
            undefined,
            new GetTestBySubjectDto(enrollment_id, seminarian_id, subject_id, academic_term_id, status),
        ];
    }
}
exports.GetTestBySubjectDto = GetTestBySubjectDto;
[];
