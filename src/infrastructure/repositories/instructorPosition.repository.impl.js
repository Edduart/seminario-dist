"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorPositionRepositoryImpl = void 0;
class InstructorPositionRepositoryImpl {
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
exports.InstructorPositionRepositoryImpl = InstructorPositionRepositoryImpl;
