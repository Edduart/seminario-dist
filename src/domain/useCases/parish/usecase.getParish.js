"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParish = void 0;
class GetParish {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetParish = GetParish;
