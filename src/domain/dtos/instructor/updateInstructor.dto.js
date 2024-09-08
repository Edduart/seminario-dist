"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInstructorDto = void 0;
class UpdateInstructorDto {
    constructor(professor_id, starting_date, instructor_position, status, instructor_role) {
        this.professor_id = professor_id;
        this.starting_date = starting_date;
        this.instructor_position = instructor_position;
        this.status = status;
        this.instructor_role = instructor_role;
    }
    get values() {
        const returnObj = {};
        if (this.starting_date)
            returnObj.starting_date = this.starting_date;
        if (this.instructor_position)
            returnObj.instructor_position = this.instructor_position;
        if (this.status)
            returnObj.status = this.status;
        return returnObj;
    }
    static update(props) {
        let { professor_id, starting_date, instructor_position, status } = props;
        console.log(props);
        if (!professor_id) {
            return ["Instructor ID is required"];
        }
        else if (typeof professor_id !== "string") {
            return ["Instructor ID must be a string"];
        }
        if (!starting_date) {
            throw "starting date is required";
        }
        const completeDate = starting_date.toString() + "T00:00:00.000Z";
        let newStartingDate = new Date(completeDate);
        starting_date = completeDate;
        console.log(starting_date);
        if (newStartingDate.toString() === "Invalid Date") {
            throw "starting date is not a valid date";
        }
        if (!instructor_position)
            return ["instructor position is required"];
        let instructor_role = 0;
        if (instructor_position === "INSTRUCTOR" ||
            instructor_position === "DIRECTOR_ESPIRITUAL" ||
            instructor_position === "ECONOMO") {
            instructor_role = 6;
        }
        else if (instructor_position === "ASESOR_PROPEDEUTICO") {
            instructor_role = 7;
        }
        else if (instructor_position === "VICERECTOR") {
            instructor_role = 3;
        }
        else if (instructor_position === "RECTOR") {
            instructor_role = 2;
        }
        else {
            return [`error instructor role no valid, ${instructor_position}`];
        }
        return [
            undefined,
            new UpdateInstructorDto(professor_id, starting_date, instructor_position, status, instructor_role),
        ];
    }
}
exports.UpdateInstructorDto = UpdateInstructorDto;
