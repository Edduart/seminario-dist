"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRepositoryImpl = void 0;
class TestRepositoryImpl {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    GetSeminarianListWithNotes(data) {
        return this.dataSource.GetSeminarianListWithNotes(data);
    }
    getAverageGradeBySubject(dto) {
        return this.dataSource.getAverageGradeBySubject(dto);
    }
    getTestForTestScore(dto) {
        return this.dataSource.getTestForTestScore(dto);
    }
    getTestBySubject(dto) {
        return this.dataSource.getTestBySubject(dto);
    }
    create(dto) {
        return this.dataSource.create(dto);
    }
    get(dto) {
        return this.dataSource.get(dto);
    }
    update(dto) {
        return this.dataSource.update(dto);
    }
    delete(id) {
        return this.dataSource.delete(id);
    }
}
exports.TestRepositoryImpl = TestRepositoryImpl;
