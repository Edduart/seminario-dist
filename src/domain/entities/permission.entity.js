"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionEntity = void 0;
class PermissionEntity {
    constructor(id, name, type, table) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.table = table;
    }
    static fromdb(object) {
        const { id, name, type, table } = object;
        return new PermissionEntity(id, name, type, table);
    }
}
exports.PermissionEntity = PermissionEntity;
