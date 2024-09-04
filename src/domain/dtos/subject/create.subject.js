"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubjectDTO = void 0;
class CreateSubjectDTO {
    constructor(course_id, description, semester, academic_field_id, status, precedent) {
        this.course_id = course_id;
        this.description = description;
        this.semester = semester;
        this.academic_field_id = academic_field_id;
        this.status = status;
        this.precedent = precedent;
    }
    static CreateDTO(object) {
        let { course_id, description, semester, academic_field_id, precedent } = object;
        let bool_homo = false;
        let precedent_numberl = undefined;
        let errorarray = [];
        if (Number.isNaN(academic_field_id) || !Number.isInteger(academic_field_id) || academic_field_id < 0) {
            errorarray.push("academic_id id must be a non-negative integer");
        }
        if (Number.isNaN(course_id) || !Number.isInteger(course_id) || course_id < 0) {
            errorarray.push("course id must be a non-negative integer");
        }
        console.log(description + " description: " + (description != undefined));
        if (description != undefined) {
            if ((description.length >= 200) || (description.length < 5))
                errorarray.push("description must be between 5 and 200 char");
        }
        else {
            errorarray.push("description is required");
        }
        if (Number.isNaN(semester) || !Number.isInteger(semester) || semester < 0) {
            errorarray.push("semester id must be a non-negative integer");
        }
        if (precedent != undefined) {
            precedent_numberl = Number(precedent);
            if (Number.isNaN(precedent_numberl) || !Number.isInteger(precedent_numberl) || precedent_numberl < 0) {
                errorarray.push("precedent number id must be a non-negative integer");
            }
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        description = description.toUpperCase();
        return [undefined, new CreateSubjectDTO(course_id, description, semester, academic_field_id, true, precedent_numberl)];
    }
    Validate() {
        let errorarray = [];
        if (this.academic_field_id <= 0)
            errorarray.push("course id must be positive");
        if (this.course_id <= 0)
            errorarray.push("course id must be positive");
        if (this.description.length > 200)
            errorarray.push("description is too long");
        if (this.precedent != undefined && this.precedent <= 0)
            errorarray.push("precedent must be positive");
        if (this.semester <= 0)
            errorarray.push("semester must be positive");
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreateSubjectDTO = CreateSubjectDTO;
