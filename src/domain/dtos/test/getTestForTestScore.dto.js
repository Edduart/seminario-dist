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
        if (!subject_id || isNaN(Number(subject_id)) || +subject_id < 0) {
            dataErrors.push("subject_id is must be a valid number");
        }
        else {
            subject_id = +subject_id;
        }
        if (!academic_term_id ||
            isNaN(Number(academic_term_id)) ||
            +academic_term_id < 0) {
            dataErrors.push("subject_id is must be a valid number");
        }
        else {
            academic_term_id = +academic_term_id;
        }
        if (dataErrors.length > 0)
            return [dataErrors];
        return [
            undefined,
            new GetTestForTestScoreDto(subject_id, academic_term_id),
        ];
    }
}
exports.GetTestForTestScoreDto = GetTestForTestScoreDto;
