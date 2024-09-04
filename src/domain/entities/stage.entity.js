"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stages = exports.StageEntity = void 0;
class StageEntity {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }
    static fromObject(object) {
        const { id, description } = object;
        if (!id)
            throw "Id is required";
        if (!description)
            throw "Description is required";
        return new StageEntity(id, description);
    }
}
exports.StageEntity = StageEntity;
exports.stages = {
    ALL: 0,
    PROPEDEUTICO: 1,
    DISCIPULADO: 2,
    CONFIGURATIVA: 3,
};
