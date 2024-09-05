"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumenDTO = void 0;
class DocumenDTO {
    constructor(id, forename, surname, period, stage) {
        this.id = id;
        this.forename = forename;
        this.surname = surname;
        this.period = period;
        this.stage = stage;
    }
    static fromdb(object) {
        const { id, forename, surname } = object;
        return new DocumenDTO(id, forename, surname);
    }
}
exports.DocumenDTO = DocumenDTO;
