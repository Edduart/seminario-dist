"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessor = void 0;
class CreateProfessor {
    constructor(user, instructor_position) {
        this.user = user;
        this.instructor_position = instructor_position;
    }
    Validate() {
        let error = [];
        const userValidation = this.user.Validate();
        if (userValidation != null) {
            error.push(userValidation);
        }
        if (error.length > 0) {
            return error.join(", ");
        }
        return null;
    }
}
exports.CreateProfessor = CreateProfessor;
