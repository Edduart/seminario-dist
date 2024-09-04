"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFieldEntity = void 0;
const stage_entity_1 = require("./stage.entity");
class academicFieldEntity {
    constructor(id, stage, description) {
        this.id = id;
        this.stage = stage;
        this.description = description;
    }
    static fromObject(object) {
        const { id, stage, description } = object;
        const stage_obj = stage_entity_1.StageEntity.fromObject(stage);
        return new academicFieldEntity(id, stage_obj, description);
    }
}
exports.academicFieldEntity = academicFieldEntity;
