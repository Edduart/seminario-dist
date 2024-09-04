"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDioceseByName = void 0;
class GetDioceseByName {
    constructor(repository) {
        this.repository = repository;
    }
    execute(name) {
        return this.repository.getByName(name);
    }
}
exports.GetDioceseByName = GetDioceseByName;
