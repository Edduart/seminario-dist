"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const parish_entity_1 = require("./parish.entity");
const role_entity_1 = require("./role.entity");
class UserEntity {
    constructor(person_id, status, password, role, fecha, forename, surname, profile_picture, parish) {
        this.person_id = person_id;
        this.status = status;
        this.password = password;
        this.role = role;
        this.fecha = fecha;
        this.forename = forename;
        this.surname = surname;
        this.profile_picture = profile_picture;
        this.parish = parish;
    }
    static FromDbAccess(object) {
        const { person_id, status, parish, password, role, fecha, forename, surname, profile_picture } = object;
        const parish_obj = parish_entity_1.ParishEntity.fromObject(parish);
        const role_obj = role_entity_1.RoleEntity.fromdb(role);
        const date_obj = new Date(fecha);
        return new UserEntity(person_id, status, password, role_obj, date_obj, forename, surname, profile_picture, parish_obj);
    }
}
exports.UserEntity = UserEntity;
