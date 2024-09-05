"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAcademicTermByEnrollmentDto = void 0;
class GetAcademicTermByEnrollmentDto {
    constructor(seminarian_id) {
        this.seminarian_id = seminarian_id;
    }
    static get(props) {
        let { seminarian_id } = props;
        let dataErrors = [];
        console.log("🚀 ~ GetAcademicTermByEnrollmentDto ~ get ~ props:", props);
        if (dataErrors.length > 0)
            return [dataErrors];
        return [undefined, new GetAcademicTermByEnrollmentDto(seminarian_id)];
    }
}
exports.GetAcademicTermByEnrollmentDto = GetAcademicTermByEnrollmentDto;
;
