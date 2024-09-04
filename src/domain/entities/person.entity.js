"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodType = exports.PersonEntity = void 0;
class PersonEntity {
    constructor(id, profile_picture_path, forename, surname, email, birthdate, medical_record, BloodType, cellpones, medias, date_String) {
        this.id = id;
        this.profile_picture_path = profile_picture_path;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.birthdate = birthdate;
        this.medical_record = medical_record;
        this.BloodType = BloodType;
        this.cellpones = cellpones;
        this.medias = medias;
        this.date_String = date_String;
    }
    static fromdb(object) {
        const { id, profile_picture_path, forename, surname, email, birthdate, medical_record, BloodType } = object;
        let fecha = new Date(birthdate);
        const date_tocreate = fecha.toISOString().split('T')[0];
        const person = new PersonEntity(id, profile_picture_path, forename, surname, email, fecha, medical_record, BloodType);
        person.date_String = date_tocreate;
        return person;
    }
}
exports.PersonEntity = PersonEntity;
var BloodType;
(function (BloodType) {
    BloodType["A_POSITIVO"] = "A+";
    BloodType["A_NEGATIVO"] = "A-";
    BloodType["B_POSITIVO"] = "B+";
    BloodType["B_NEGATIVO"] = "B-";
    BloodType["AB_POSITIVO"] = "AB+";
    BloodType["AB_NEGATIVO"] = "AB-";
    BloodType["O_POSITIVO"] = "O+";
    BloodType["O_NEGATIVO"] = "O-";
    BloodType["UNKNOWN"] = "UNKNOWN";
})(BloodType || (exports.BloodType = BloodType = {}));
