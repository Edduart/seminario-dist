"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
class CreateUserDto {
    constructor(person, degree, parish_id, password, role) {
        this.person = person;
        this.degree = degree;
        this.parish_id = parish_id;
        this.password = password;
        this.role = role;
    }
}
exports.CreateUserDto = CreateUserDto;
