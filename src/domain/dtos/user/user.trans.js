"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTrans = void 0;
class UserTrans {
    constructor(person_id, Permisos, fecha, role, forename, surname, profile_picture) {
        this.person_id = person_id;
        this.Permisos = Permisos;
        this.fecha = fecha;
        this.role = role;
        this.forename = forename;
        this.surname = surname;
        this.profile_picture = profile_picture;
    }
}
exports.UserTrans = UserTrans;
