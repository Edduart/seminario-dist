"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStageIfApproved = void 0;
class UpdateStageIfApproved {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.updateStageIfApproved();
    }
}
exports.UpdateStageIfApproved = UpdateStageIfApproved;
