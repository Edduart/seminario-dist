"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorRepositoryImpl = void 0;
class ProfessorRepositoryImpl {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    update(data) {
        return this.dataSource.update(data);
    }
    delete(id) {
        return this.dataSource.delete(id);
    }
    create(createDto) {
        return this.dataSource.create(createDto);
    }
    get(dto) {
        return this.dataSource.get(dto);
    }
}
exports.ProfessorRepositoryImpl = ProfessorRepositoryImpl;
