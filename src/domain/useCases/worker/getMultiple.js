"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWorker = void 0;
class GetWorker {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id, puesto) {
        return this.repository.get(id, puesto);
    }
}
exports.GetWorker = GetWorker;
