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
        let validationErrors = [];
        if (test_id != undefined) {
            test_id = +test_id;
            if (isNaN(Number(test_id)) || test_id < 0)
                validationErrors.push({
                    field: "test_id",
                    message: "test_id must be a valid ID",
                });
        }
        if (enrollment_id != undefined) {
            enrollment_id = +enrollment_id;
            if (isNaN(Number(enrollment_id)) || enrollment_id < 0)
                validationErrors.push({
                    field: "enrollment_id",
                    message: "enrollment_id must be a valid ID",
                });
        }
        if (validationErrors.length > 0)
            return [validationErrors];
        return [undefined, new GetTestScoreDto(test_id, enrollment_id)];
    }
}
exports.GetTestScoreDto = GetTestScoreDto;
