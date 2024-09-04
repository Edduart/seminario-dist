"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTest = void 0;
class DeleteTest {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.delete(id);
    }
}
exports.DeleteTest = DeleteTest;
