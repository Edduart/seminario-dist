"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWorker = void 0;
class DeleteWorker {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.Delete(id);
    }
}
exports.DeleteWorker = DeleteWorker;
