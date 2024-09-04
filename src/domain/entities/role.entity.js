"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntity = void 0;
class RoleEntity {
    constructor(id, name, description, premissions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.premissions = premissions;
    }
    static fromdb(object) {
        const { id, name, description, premissions } = object;
        return new RoleEntity(id, name, description, premissions);
    }
}
exports.RoleEntity = RoleEntity;
