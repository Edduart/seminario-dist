"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarianRepositoryImpl = void 0;
class SeminarianRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    Ficha(id) {
        return this.datasource.Ficha(id);
    }
    getByID(id) {
        return this.datasource.getByID(id);
    }
    get(data) {
        return this.datasource.get(data);
    }
    create(data) {
        return this.datasource.create(data);
    }
    Update(data) {
        return this.datasource.Update(data);
    }
    Delete(id) {
        return this.datasource.Delete(id);
    }
}
exports.SeminarianRepositoryImpl = SeminarianRepositoryImpl;
