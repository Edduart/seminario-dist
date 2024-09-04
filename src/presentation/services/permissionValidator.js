"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePermission = void 0;
const domain_1 = require("../../domain");
function ValidatePermission(_data, _table, _type) {
    const permissions = _data.map((permiso) => {
        return domain_1.PermissionEntity.fromdb({
            id: permiso.id,
            name: permiso.name,
            type: permiso.type,
            table: permiso.table,
        });
    });
    const result = permissions.find((PermissionEntity) => (PermissionEntity.table == _table && PermissionEntity.type == _type) || (PermissionEntity.id == 30));
    if (result == undefined) {
        throw new Error("Denied as not allowed");
    }
    else
        return true;
}
exports.ValidatePermission = ValidatePermission;
