"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteParish = void 0;
class DeleteParish {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.Delete(id);
    }
}
exports.DeleteParish = DeleteParish;
