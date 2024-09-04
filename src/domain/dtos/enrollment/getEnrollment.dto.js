"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEnrollmentDto = void 0;
const formatDate_1 = require("../../../presentation/utils/formatDate");
class GetEnrollmentDto {
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
            new GetEnrollmentDto(enrollment_id, seminarian_id, subject_id, academic_term_id, status),
        ];
    }
    static getResponse(enrollment) {
        const enrollmentDto = enrollment.map((enrollment) => ({
            seminarian_id: enrollment.seminarian_id,
            enrollment_id: enrollment.enrollment_id,
            subject: {
                id: enrollment.subject.id,
                name: enrollment.subject.description,
            },
            academic_term: {
                id: enrollment.academic_term.id,
                start_date: (0, formatDate_1.formatDate)(enrollment.academic_term.start_date.toISOString()),
                end_date: (0, formatDate_1.formatDate)(enrollment.academic_term.end_date.toISOString()),
                status: enrollment.academic_term.status,
            },
            subject_status: enrollment.status,
        }));
        return enrollmentDto;
    }
}
exports.GetEnrollmentDto = GetEnrollmentDto;
