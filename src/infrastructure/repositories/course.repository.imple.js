"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepositoryImpl = void 0;
class CourseRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(createDto) {
        return this.datasource.create(createDto);
    }
    getAll() {
        return this.datasource.getAll();
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    updateById(updateDto) {
        return this.datasource.updateById(updateDto);
    }
    deleteById(id) {
        return this.datasource.deleteById(id);
    }
}
exports.CourseRepositoryImpl = CourseRepositoryImpl;
