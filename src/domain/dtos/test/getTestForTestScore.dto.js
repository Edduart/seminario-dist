"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestForTestScoreDto = void 0;
class GetTestForTestScoreDto {
    constructor(subject_id, academic_term_id) {
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
    }
    static get(props) {
        let { subject_id, academic_term_id } = props;
        let dataErrors = [];
        if (subject_id != undefined)
            subject_id = +subject_id;
        if (academic_term_id != undefined)
            academic_term_id = +academic_term_id;
        if (dataErrors.length > 0)
            return [dataErrors];
        return [
            undefined,
            new GetTestForTestScoreDto(subject_id, academic_term_id),
        ];
    }
}
exports.GetTestForTestScoreDto = GetTestForTestScoreDto;
