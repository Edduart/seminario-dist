"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEnrollment = void 0;
class DeleteEnrollment {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.delete(id);
    }
}
exports.DeleteEnrollment = DeleteEnrollment;
