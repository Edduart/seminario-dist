"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageEnum = exports.ForeingSeminarianEntity = void 0;
class ForeingSeminarianEntity {
    constructor(seminary_name, stage, stage_year, id) {
        this.seminary_name = seminary_name;
        this.stage = stage;
        this.stage_year = stage_year;
        this.id = id;
    }
    static fromdb(object) {
        const { seminary_name, stage, stage_year } = object;
        return new ForeingSeminarianEntity(seminary_name, stage, stage_year);
    }
}
exports.ForeingSeminarianEntity = ForeingSeminarianEntity;
var StageEnum;
(function (StageEnum) {
    StageEnum["PROPEDEUTICO"] = "1";
    StageEnum["DISCIPULADO"] = "2";
    StageEnum["CONFIGURATIVA"] = "3";
})(StageEnum || (exports.StageEnum = StageEnum = {}));
