"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestBySubject = void 0;
class GetTestBySubject {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.getTestBySubject(dto);
    }
}
exports.GetTestBySubject = GetTestBySubject;
