"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
class UserRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    RestartPassword(id) {
        return this.datasource.RestartPassword(id);
    }
    getById(id) {
        return this.datasource.getById(id);
    }
    getByType(type) {
        return this.datasource.getByType(type);
    }
    getAll() {
        return this.datasource.getAll();
    }
    Login(data) {
        return this.datasource.Login(data);
    }
    ChangePassword(data) {
        return this.datasource.ChangePassword(data);
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
