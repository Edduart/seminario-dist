"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnrollment = void 0;
class UpdateEnrollment {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.update(dto);
    }
}
exports.UpdateEnrollment = UpdateEnrollment;
