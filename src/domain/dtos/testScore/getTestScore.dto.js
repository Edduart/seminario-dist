"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestScoreDto = void 0;
class GetTestScoreDto {
    constructor(test_id, enrollment_id) {
        this.test_id = test_id;
        this.enrollment_id = enrollment_id;
    }
    static get(props) {
        let { test_id, enrollment_id } = props;
        let dataErrors = [];
        if (test_id != undefined)
            test_id = +test_id;
        if (enrollment_id != undefined)
            enrollment_id = +enrollment_id;
        if (dataErrors.length > 0)
            return [dataErrors];
        return [undefined, new GetTestScoreDto(test_id, enrollment_id)];
    }
}
exports.GetTestScoreDto = GetTestScoreDto;
