"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestDto = void 0;
class GetTestDto {
    constructor(id, subject_id, academic_term_id, status) {
        this.id = id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.status = status;
    }
    static get(props) {
        let { id, subject_id, academic_term_id, status } = props;
        let dataErrors = [];
        if (id != undefined)
            id = +id;
        if (subject_id != undefined)
            subject_id = +subject_id;
        if (academic_term_id != undefined)
            academic_term_id = +academic_term_id;
        if (status != undefined)
            status = Boolean(+status);
        console.log(status);
        if (dataErrors.length > 0)
            return [dataErrors];
        return [
            undefined,
            new GetTestDto(id, subject_id, academic_term_id, status),
        ];
    }
}
exports.GetTestDto = GetTestDto;
