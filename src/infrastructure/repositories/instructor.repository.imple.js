"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRepositoryImpl = void 0;
class InstructorRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    Ficha(id) {
        return this.datasource.Ficha(id);
    }
    create(createDto) {
        return this.datasource.create(createDto);
    }
    updateById(updateDto) {
        return this.datasource.updateById(updateDto);
    }
    getAll() {
        return this.datasource.getAll();
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    deleteById(id) {
        return this.datasource.deleteById(id);
    }
}
exports.InstructorRepositoryImpl = InstructorRepositoryImpl;
