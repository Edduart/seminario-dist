"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfessorDto = void 0;
class UpdateProfessorDto {
    constructor(person, user, instructor_position) {
        this.person = person;
        this.user = user;
        this.instructor_position = instructor_position;
    }
    DataValidation() {
        let error = [];
        const validation = this.person.Validate();
        if (validation != null)
            error.push(validation);
        if (error.length > 0) {
            return error.join(", ");
        }
        return null;
    }
}
exports.UpdateProfessorDto = UpdateProfessorDto;
