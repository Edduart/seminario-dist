"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
class UpdateUserDto {
    constructor(person_id, degree, parish_id, role_id, password, status) {
        this.person_id = person_id;
        this.degree = degree;
        this.parish_id = parish_id;
        this.role_id = role_id;
        this.password = password;
        this.status = status;
    }
}
exports.UpdateUserDto = UpdateUserDto;
