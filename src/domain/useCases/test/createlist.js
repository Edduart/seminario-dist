"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSeminarianPerNoteUse = void 0;
class GetSeminarianPerNoteUse {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return this.repository.GetSeminarianListWithNotes(data);
    }
}
exports.GetSeminarianPerNoteUse = GetSeminarianPerNoteUse;
