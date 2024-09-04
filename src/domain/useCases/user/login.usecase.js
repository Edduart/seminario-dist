"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login_Use = void 0;
class Login_Use {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.Login(data);
    }
}
exports.Login_Use = Login_Use;
