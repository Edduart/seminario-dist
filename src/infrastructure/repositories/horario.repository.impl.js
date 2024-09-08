"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioRepositoryImpl = void 0;
class HorarioRepositoryImpl {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    get(id) {
        return this.dataSource.get(id);
    }
    updateById(data) {
        return this.dataSource.updateById(data);
    }
}
exports.HorarioRepositoryImpl = HorarioRepositoryImpl;
