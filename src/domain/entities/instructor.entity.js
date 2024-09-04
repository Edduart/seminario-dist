"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorPostion = exports.InstructorEntity = void 0;
const formatDate_1 = require("../../presentation/utils/formatDate");
class InstructorEntity {
    constructor(professor_id, starting_date, instructor_position, status, starting_date_string) {
        this.professor_id = professor_id;
        this.starting_date = starting_date;
        this.instructor_position = instructor_position;
        this.status = status;
        this.starting_date_string = starting_date_string;
    }
    static fromObject(object) {
        let { professor_id, starting_date, instructor_position, status, starting_date_string, } = object;
        if (starting_date_string == undefined)
            starting_date_string = (0, formatDate_1.formatDate)(starting_date.toISOString());
        if (!professor_id)
            throw "professor id is required";
        if (!starting_date) {
            throw "starting date is required";
        }
        else if (isNaN(starting_date.getTime())) {
            throw "starting date is not a valid date";
        }
        if (!instructor_position)
            throw "Instructor position is required";
        return new InstructorEntity(professor_id, starting_date, instructor_position, status, starting_date_string);
    }
}
exports.InstructorEntity = InstructorEntity;
var InstructorPostion;
(function (InstructorPostion) {
    InstructorPostion["RECTOR"] = "RECTOR";
    InstructorPostion["VICERECTOR"] = "VICERECTOR";
    InstructorPostion["ASESOR_PROPEDEUTICO"] = "ASESOR PROPEDEUTICO";
    InstructorPostion["DIRECTOR_ESPIRITUAL"] = "DIRECTOR ESPIRITUAL";
    InstructorPostion["ECONOMO"] = "ECONOMO";
    InstructorPostion["DESACTIVADO"] = "DESACTIVADO";
})(InstructorPostion || (exports.InstructorPostion = InstructorPostion = {}));
