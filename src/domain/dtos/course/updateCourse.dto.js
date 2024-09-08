"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseDto = void 0;
class UpdateCourseDto {
    constructor(id, instructor_id) {
        this.id = id;
        this.instructor_id = instructor_id;
    }
    static update(props) {
        const { id, instructor_id } = props;
        if (!id || isNaN(Number(id))) {
            return ["Id must be a number > 0 and integer"];
        }
        if (instructor_id !== null) {
            if (typeof instructor_id !== "string") {
                return ["Instructor ID must be a string"];
            }
            else {
                if (!/^(V|E)-\d{1,18}$/.test(instructor_id))
                    return ["Instructor ID must follows this format: V-xxxxxx"];
            }
        }
        return [undefined, new UpdateCourseDto(id, instructor_id)];
    }
}
exports.UpdateCourseDto = UpdateCourseDto;
