"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfessorDto = void 0;
class GetProfessorDto {
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }
    static GetDto(props) {
        const { id, status } = props;
        let dataErrors = [];
        let statusToNumber;
        if (id != undefined) {
        }
        if (status != undefined) {
            statusToNumber = +status;
            console.log("🚀 ~ GetProfessorDto ~ GetDto ~ statusToNumber:", statusToNumber);
            if (Number.isNaN(statusToNumber) ||
                !Number.isInteger(statusToNumber) ||
                statusToNumber < 0 ||
                statusToNumber > 1)
                dataErrors.push("Status must be a valid number between 0 and 1");
        }
        if (dataErrors.length > 0)
            return [dataErrors];
        return [undefined, new GetProfessorDto(id, statusToNumber)];
    }
}
exports.GetProfessorDto = GetProfessorDto;
