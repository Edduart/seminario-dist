"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEnrollment = void 0;
class GetEnrollment {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.get(dto);
    }
}
exports.GetEnrollment = GetEnrollment;
