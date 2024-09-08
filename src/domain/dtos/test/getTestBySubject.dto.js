"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestBySubjectDto = void 0;
const enrollment_entity_1 = require("../../entities/enrollment.entity");
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
        if (enrollment_id != undefined) {
            if (isNaN(Number(enrollment_id)) || +enrollment_id < 0)
                dataErrors.push("id is must be a valid number");
            enrollment_id = +enrollment_id;
        }
        if (seminarian_id != undefined) {
            if (!/^(V|E)-\d{1,18}$/.test(seminarian_id))
                dataErrors.push("id is must follows this format: V-xxxxxx");
        }
        if (subject_id != undefined) {
            if (isNaN(Number(subject_id)) || +subject_id < 0)
                dataErrors.push("subject_id is must be a valid number");
            subject_id = +subject_id;
        }
        if (academic_term_id != undefined) {
            if (isNaN(Number(academic_term_id)) || +academic_term_id < 0)
                dataErrors.push("academic_term_id is must be a valid number");
            academic_term_id = +academic_term_id;
        }
        if (status != undefined) {
            if (!Object.values(enrollment_entity_1.EnrollmentStatus).includes(status))
                dataErrors.push("status is must be a valid enrollment status in uppercase");
        }
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
