"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorPositionEntity = void 0;
class InstructorPositionEntity {
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
        return new InstructorPositionEntity(id, description);
    }
}
exports.InstructorPositionEntity = InstructorPositionEntity;
