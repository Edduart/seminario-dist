"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnrollmentDto = void 0;
class UpdateEnrollmentDto {
    constructor(enrollment_id, status) {
        this.enrollment_id = enrollment_id;
        this.status = status;
    }
    get values() {
        const returnObj = {};
        if (this.status)
            returnObj.status = this.status;
        return returnObj;
    }
    static update(props) {
        let { enrollment_id, status } = props;
        let dataErrors = [];
        if (dataErrors.length > 0)
            return [dataErrors];
        console.log(props);
        return [undefined, new UpdateEnrollmentDto(enrollment_id, status)];
    }
}
exports.UpdateEnrollmentDto = UpdateEnrollmentDto;
