"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageRepositoryImpl = void 0;
class StageRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    getAll() {
        return this.datasource.getAll();
    }
    findById(id) {
        return this.datasource.findById(id);
    }
}
exports.StageRepositoryImpl = StageRepositoryImpl;
