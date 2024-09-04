"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEnrollmentDto = void 0;
class DeleteEnrollmentDto {
    constructor(seminarian_id, subject_id, academic_term_id) {
        this.seminarian_id = seminarian_id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
    }
    static delete(props) {
        let { seminarian_id, subject_id, academic_term_id } = props;
        let dataErrors = [];
        if (dataErrors.length > 0)
            return [dataErrors];
        return [
            undefined,
            new DeleteEnrollmentDto(seminarian_id, [subject_id], academic_term_id),
        ];
    }
}
exports.DeleteEnrollmentDto = DeleteEnrollmentDto;
