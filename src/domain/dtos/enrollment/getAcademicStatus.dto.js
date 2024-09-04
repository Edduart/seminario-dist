"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAcademicStatusDto = void 0;
class GetAcademicStatusDto {
    constructor(seminarian_id) {
        this.seminarian_id = seminarian_id;
    }
    static get(props) {
        let { seminarian_id } = props;
        let dataErrors = [];
        if (dataErrors.length > 0)
            return [dataErrors];
        return [undefined, new GetAcademicStatusDto(seminarian_id)];
    }
}
exports.GetAcademicStatusDto = GetAcademicStatusDto;
