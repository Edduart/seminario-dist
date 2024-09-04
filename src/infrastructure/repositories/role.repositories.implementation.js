"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepositoryImpl = void 0;
class RoleRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    Update(nuevo) {
        return this.datasource.Update(nuevo);
    }
    GetAllPermissions() {
        return this.datasource.GetAllPermissions();
    }
    create(data) {
        return this.datasource.create(data);
    }
    getRoleMultiple(id, name) {
        return this.datasource.getRoleMultiple(id, name);
    }
    Delete(id) {
        return this.datasource.Delete(id);
    }
}
exports.RoleRepositoryImpl = RoleRepositoryImpl;
