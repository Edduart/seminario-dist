"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseDto = void 0;
class UpdateCourseDto {
    constructor(id, stage_id, description, instructor_id) {
        this.id = id;
        this.stage_id = stage_id;
        this.description = description;
        this.instructor_id = instructor_id;
    }
    get values() {
        const returnObj = {};
        if (this.stage_id)
            returnObj.stage_id = this.stage_id;
        if (this.description)
            returnObj.description = this.description;
        if (this.instructor_id)
            returnObj.instructor_id = this.instructor_id;
        return returnObj;
    }
    static update(props) {
        const { id, stage_id, description, instructor_id } = props;
        if (!id || isNaN(Number(id))) {
            return ["Id must be a number > 0 and integer"];
        }
        if (!stage_id) {
            return ["Stage ID is required"];
        }
        else if (isNaN(Number(stage_id))) {
            return ["Stage ID must be a valid ID or number"];
        }
        if (!description) {
            return ["Description is required"];
        }
        else if (typeof description !== "string") {
            return ["Description must be a string"];
        }
        let description_u = description.toUpperCase();
        if (!instructor_id) {
            return ["Instructor ID is required"];
        }
        else if (typeof instructor_id !== "string") {
            return ["Instructor ID must be a string"];
        }
        return [
            undefined,
            new UpdateCourseDto(id, stage_id, description_u, instructor_id),
        ];
    }
}
exports.UpdateCourseDto = UpdateCourseDto;
