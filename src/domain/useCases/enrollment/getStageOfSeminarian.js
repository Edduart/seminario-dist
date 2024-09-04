"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStageOfSeminarian = void 0;
class getStageOfSeminarian {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.getStageOfSeminarian(dto);
    }
}
exports.getStageOfSeminarian = getStageOfSeminarian;
