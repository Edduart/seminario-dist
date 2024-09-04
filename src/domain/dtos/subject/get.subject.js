"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSubjectDTO = void 0;
class GetSubjectDTO {
    constructor(description, course_id, academic_field_id, stage_id, status, id) {
        this.description = description;
        this.course_id = course_id;
        this.academic_field_id = academic_field_id;
        this.stage_id = stage_id;
        this.status = status;
        this.id = id;
    }
    static CreateDTO(object) {
        let { description, course_id, academic_field_id, stage_id, status } = object;
        let errorarray = [];
        let status_aux = true;
        let course_id_number, academic_field_id_number, stage_id_number = undefined;
        if (status != undefined) {
            const number_aux = Number(status);
            console.log(number_aux);
            console.log(Number.isNaN(number_aux));
            console.log(!Number.isNaN(number_aux));
            if (!Number.isNaN(number_aux)) {
                switch (number_aux) {
                    case 0:
                        status_aux = false;
                        break;
                    case 1:
                        status_aux = true;
                        break;
                    default:
                        errorarray.push("status can only contain 0 and 1");
                        break;
                }
            }
            else {
                errorarray.push("status can only contain 0 and 1");
            }
        }
        if (description != undefined) {
            description = description.toUpperCase();
            if (description.length > 200)
                errorarray.push("description too large");
        }
        if (course_id !== undefined) {
            course_id_number = Number(course_id);
            if (Number.isNaN(course_id_number) || !Number.isInteger(course_id_number) || course_id_number < 0) {
                errorarray.push("course id must be a non-negative integer");
            }
        }
        if (academic_field_id !== undefined) {
            academic_field_id_number = Number(academic_field_id);
            if (Number.isNaN(academic_field_id_number) || !Number.isInteger(academic_field_id_number) || academic_field_id_number < 0) {
                errorarray.push("academic field id must be a non-negative integer");
            }
        }
        if (stage_id !== undefined) {
            stage_id_number = Number(stage_id);
            if (Number.isNaN(stage_id_number) || !Number.isInteger(stage_id_number) || stage_id_number < 0) {
                errorarray.push("stage id must be a non-negative integer");
            }
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new GetSubjectDTO(description, course_id_number, academic_field_id_number, stage_id_number, status_aux)];
    }
    static FindDto(id, status) {
        return new GetSubjectDTO(undefined, undefined, undefined, undefined, status == undefined ? true : status, id);
    }
}
exports.GetSubjectDTO = GetSubjectDTO;
