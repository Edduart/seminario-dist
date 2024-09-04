"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarianListDTO = void 0;
class SeminarianListDTO {
    constructor(id, forename, surname, email, diocesi_name, note) {
        this.id = id;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.diocesi_name = diocesi_name;
        this.note = note;
    }
    static fromdb(object) {
        const { id, forename, surname, email, diocesi_name, note } = object;
        return new SeminarianListDTO(id, forename, surname, email, diocesi_name, note);
    }
}
exports.SeminarianListDTO = SeminarianListDTO;
