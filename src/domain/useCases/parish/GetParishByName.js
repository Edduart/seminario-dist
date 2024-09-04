"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParishByname = void 0;
class GetParishByname {
    constructor(repository) {
        this.repository = repository;
    }
    execute(name) {
        return this.repository.getByName(name);
    }
}
exports.GetParishByname = GetParishByname;
