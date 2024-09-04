"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionRepositoryImpl = void 0;
class InstructionRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    Update(data) {
        return this.datasource.Update(data);
    }
    Get(data) {
        return this.datasource.Get(data);
    }
    Create(data) {
        return this.datasource.Create(data);
    }
}
exports.InstructionRepositoryImpl = InstructionRepositoryImpl;
