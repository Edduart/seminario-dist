"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectAllowToEnrollEquivalencyDto = void 0;
class SubjectAllowToEnrollEquivalencyDto {
    constructor(seminarian_id) {
        this.seminarian_id = seminarian_id;
    }
    static get(props) {
        let { seminarian_id } = props;
        let dataErrors = [];
        if (dataErrors.length > 0)
            return [dataErrors];
        return [undefined, new SubjectAllowToEnrollEquivalencyDto(seminarian_id)];
    }
}
exports.SubjectAllowToEnrollEquivalencyDto = SubjectAllowToEnrollEquivalencyDto;
