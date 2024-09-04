"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitacoraRepositoryImpl = void 0;
class BitacoraRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(dto) {
        return this.datasource.create(dto);
    }
    Get(data) {
        return this.datasource.Get(data);
    }
}
exports.BitacoraRepositoryImpl = BitacoraRepositoryImpl;
