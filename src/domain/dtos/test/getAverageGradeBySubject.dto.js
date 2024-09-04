"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAverageGradeBySubjectDto = void 0;
class GetAverageGradeBySubjectDto {
    constructor(subject_id, academic_term_id) {
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
    }
    static get(props) {
        let { subject_id, academic_term_id } = props;
        let dataErrors = [];
        if (subject_id == undefined || !subject_id)
            dataErrors.push("subject_id is required as parameter");
        if (academic_term_id == undefined || !academic_term_id)
            dataErrors.push("academic_term_id as parameter");
        if (subject_id != undefined)
            subject_id = +subject_id;
        if (academic_term_id != undefined)
            academic_term_id = +academic_term_id;
        if (dataErrors.length > 0)
            return [dataErrors];
        return [
            undefined,
            new GetAverageGradeBySubjectDto(subject_id, academic_term_id),
        ];
    }
}
exports.GetAverageGradeBySubjectDto = GetAverageGradeBySubjectDto;
