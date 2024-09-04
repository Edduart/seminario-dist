"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorEntity = void 0;
class ProfessorEntity {
    constructor(person, social, phone_number, status_id_professor, status_user, degrees, instructor, Role_id, parish) {
        this.person = person;
        this.social = social;
        this.phone_number = phone_number;
        this.status_id_professor = status_id_professor;
        this.status_user = status_user;
        this.degrees = degrees;
        this.instructor = instructor;
        this.Role_id = Role_id;
        this.parish = parish;
    }
    static fromObject(person, social, phone_number, status_id_professor, status_user, degrees, instructor, Role_id, parish) {
        return new ProfessorEntity(person, social, phone_number, status_id_professor, status_user, degrees, instructor, Role_id, parish);
    }
}
exports.ProfessorEntity = ProfessorEntity;
