"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestScoreRepositoryImpl = void 0;
class TestScoreRepositoryImpl {
    constructor(dataSource) {
        this.dataSource = dataSource;
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
}
exports.TestScoreRepositoryImpl = TestScoreRepositoryImpl;
