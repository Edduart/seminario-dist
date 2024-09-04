"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStageOfSeminarianDto = void 0;
class GetStageOfSeminarianDto {
    constructor(stage) {
        this.stage = stage;
    }
    static get(props) {
        let { stage } = props;
        let dataErrors = [];
        if (stage === "DISCIPULAR") {
            stage = "DISCIPULADO";
        }
        if (dataErrors.length > 0)
            return [dataErrors];
        return [undefined, new GetStageOfSeminarianDto(stage)];
    }
}
exports.GetStageOfSeminarianDto = GetStageOfSeminarianDto;
