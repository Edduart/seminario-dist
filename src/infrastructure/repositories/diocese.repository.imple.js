"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DioceseRepositoryImpl = void 0;
class DioceseRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(createDioceseDto) {
        return this.datasource.create(createDioceseDto);
    }
    getAll() {
        return this.datasource.getAll();
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    updateById(updateDioceseDto) {
        return this.datasource.updateById(updateDioceseDto);
    }
    getByName(name) {
        return this.datasource.getByName(name);
    }
    deleteById(id) {
        return this.datasource.deleteById(id);
    }
}
exports.DioceseRepositoryImpl = DioceseRepositoryImpl;
