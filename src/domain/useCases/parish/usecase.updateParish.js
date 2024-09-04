"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParish = void 0;
class UpdateParish {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.updateById(dto);
    }
}
exports.UpdateParish = UpdateParish;
