"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParish = void 0;
class CreateParish {
    constructor(repository) {
        this.repository = repository;
    }
    execute(sper) {
        return this.repository.create(sper);
    }
}
exports.CreateParish = CreateParish;
