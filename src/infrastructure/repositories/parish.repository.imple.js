"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParishRepositoryImpl = void 0;
class ParishRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    getByDioceseId(id) {
        return this.datasource.getByDioceseId(id);
    }
    getAll() {
        return this.datasource.getAll();
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    getByName(name) {
        return this.datasource.getByName(name);
    }
    updateById(updateParishDto) {
        return this.datasource.updateById(updateParishDto);
    }
    create(CreateParishDto) {
        return this.datasource.create(CreateParishDto);
    }
    Delete(id) {
        return this.datasource.delete(id);
    }
}
exports.ParishRepositoryImpl = ParishRepositoryImpl;
