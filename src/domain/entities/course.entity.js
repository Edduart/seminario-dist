"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEntity = void 0;
class CourseEntity {
    constructor(id, stage_id, description, instructor_id) {
        this.id = id;
        this.stage_id = stage_id;
        this.description = description;
        this.instructor_id = instructor_id;
    }
    static fromObject(object) {
        const { id, stage_id, description, instructor_id } = object;
        if (!id)
            throw "Id is required";
        if (!stage_id)
            throw "Stage ID is required";
        if (!description)
            throw "Description is required";
        return new CourseEntity(id, stage_id, description, instructor_id);
    }
}
exports.CourseEntity = CourseEntity;
