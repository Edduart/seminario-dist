"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSeminarianDTO = void 0;
const __1 = require("../..");
class GetSeminarianDTO {
    constructor(id, forename, surname, parish_id, diocese_id, first_Date, second_Date, ministery, foreing, location, status, curse_id, subject_id, note, academic_term_id, menor_a_la_nota) {
        this.id = id;
        this.forename = forename;
        this.surname = surname;
        this.parish_id = parish_id;
        this.diocese_id = diocese_id;
        this.first_Date = first_Date;
        this.second_Date = second_Date;
        this.ministery = ministery;
        this.foreing = foreing;
        this.location = location;
        this.status = status;
        this.curse_id = curse_id;
        this.subject_id = subject_id;
        this.note = note;
        this.academic_term_id = academic_term_id;
        this.menor_a_la_nota = menor_a_la_nota;
    }
    static CreateDTO(object) {
        const { id, forename, surname, parish_id, diocese_id, first_Date, second_Date, ministery, foreing, location, status, curse_id, subject_id, note, academic_term_id, menor_a_la_nota } = object;
        let errorarray = [];
        let parish_id_number, diocese_id_number, first_Date_obj, second_Date_obj, bool_fore = undefined;
        if (id != undefined) {
            if (id.length > 20)
                errorarray.push("Id is too large");
        }
        const academic = Number(academic_term_id);
        const notenum = Number(note);
        const subjet = Number(subject_id);
        if (diocese_id !== undefined) {
            diocese_id_number = Number(id);
            if (Number.isNaN(diocese_id_number) || !Number.isInteger(diocese_id_number) || diocese_id_number < 0) {
                errorarray.push("diocesis id must be a non-negative integer");
            }
        }
        if (parish_id !== undefined) {
            parish_id_number = Number(id);
            if (Number.isNaN(parish_id_number) || !Number.isInteger(parish_id_number) || parish_id_number < 0) {
                errorarray.push("parish id must be a non-negative integer");
            }
        }
        if ((first_Date != undefined) && (second_Date != undefined)) {
            let [first, second] = [false, false];
            if (GetSeminarianDTO.isValidDate(first_Date)) {
                first = true;
            }
            errorarray.push("first is an invalid date format, try 'YYYY-MM-DD'");
            if (GetSeminarianDTO.isValidDate(second_Date)) {
                second = true;
            }
            errorarray.push("second is an invalid date format, try 'YYYY-MM-DD'");
            if (first && second) {
                first_Date_obj = new Date(first_Date);
                second_Date_obj = new Date(second_Date);
                if (first_Date_obj > second_Date_obj)
                    errorarray.push("invalid data range");
            }
        }
        if (ministery != undefined) {
            if (!(ministery in __1.seminarianMinistery_ENUM))
                errorarray.push("Invalid ministery");
        }
        if (foreing != undefined) {
            if (/^[01]*$/.test(foreing)) {
                const number_aux = Number(foreing);
                switch (number_aux) {
                    case 0:
                        bool_fore = false;
                        break;
                    case 1:
                        bool_fore = true;
                        break;
                }
            }
            errorarray.push("This field must contain only '0' or '1' ");
        }
        if (location != undefined) {
            if (!(location in __1.Locations_enum))
                errorarray.push("Invalid location");
        }
        if (status != undefined) {
            if (!(status in __1.seminarian_status_enum))
                errorarray.push("Invalid status");
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new GetSeminarianDTO(id, forename, surname, parish_id_number, diocese_id_number, first_Date_obj, second_Date_obj, ministery, bool_fore, location, status, curse_id, subjet, notenum, academic, menor_a_la_nota)];
    }
    static isValidDate(date) {
        const time = Date.parse(date);
        return !isNaN(time);
    }
    GetForeing() {
        if (this.foreing) {
            return null;
        }
        return undefined;
    }
}
exports.GetSeminarianDTO = GetSeminarianDTO;
