"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseDto = void 0;
class CreateCourseDto {
    constructor(stage_id, description, instructor_id) {
        this.stage_id = stage_id;
        this.description = description;
        this.instructor_id = instructor_id;
    }
    static create(props) {
        const { stage_id, description, instructor_id } = props;
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
        return [undefined, new CreateCourseDto(stage_id, description_u, instructor_id)];
    }
}
exports.CreateCourseDto = CreateCourseDto;
