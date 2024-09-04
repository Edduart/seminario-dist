"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRepositoryImpl = void 0;
class SubjectRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    Pensum() {
        return this.datasource.Pensum();
    }
    Get_fields() {
        return this.datasource.Get_fields();
    }
    get_instruction(data) {
        return this.datasource.get_instruction(data);
    }
    Delete(id) {
        return this.datasource.Delete(id);
    }
    Update(data) {
        return this.datasource.Update(data);
    }
    get(data) {
        return this.datasource.get(data);
    }
    create(data) {
        return this.datasource.create(data);
    }
}
exports.SubjectRepositoryImpl = SubjectRepositoryImpl;
