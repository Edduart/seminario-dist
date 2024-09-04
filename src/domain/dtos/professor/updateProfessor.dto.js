"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfessorDto = void 0;
class UpdateProfessorDto {
    constructor(person, user) {
        this.person = person;
        this.user = user;
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
