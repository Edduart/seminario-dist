"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerRepositoryImpl = void 0;
class WorkerRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    GetSocial() {
        return this.datasource.GetSocial();
    }
    Update(data) {
        return this.datasource.Update(data);
    }
    Delete(id) {
        return this.datasource.Delete(id);
    }
    create(data) {
        return this.datasource.create(data);
    }
    get(id_re, puesto) {
        return this.datasource.get(id_re, puesto);
    }
}
exports.WorkerRepositoryImpl = WorkerRepositoryImpl;
