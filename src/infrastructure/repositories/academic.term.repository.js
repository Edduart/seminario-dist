"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicTermRepositoryImpl = void 0;
class AcademicTermRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    GetByID(data) {
        return this.datasource.GetByID(data);
    }
    EndAcademicTerm(id) {
        return this.datasource.EndAcademicTerm(id);
    }
    ActivateAcademicTerm(id) {
        return this.datasource.ActivateAcademicTerm(id);
    }
    Update(id) {
        return this.datasource.Update(id);
    }
    Get(data) {
        return this.datasource.Get(data);
    }
    create(dto) {
        return this.datasource.create(dto);
    }
}
exports.AcademicTermRepositoryImpl = AcademicTermRepositoryImpl;
