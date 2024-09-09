"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seminarianMinistery_ENUM = exports.Locations_enum = exports.seminarian_status_enum = exports.SeminarianEntity = void 0;
class SeminarianEntity {
    constructor(id, apostleships, location, Ministery, stage, status, parish_id, diocesi_id, degrees, person, foreing_Data, diocesi_name) {
        this.id = id;
        this.apostleships = apostleships;
        this.location = location;
        this.Ministery = Ministery;
        this.stage = stage;
        this.status = status;
        this.parish_id = parish_id;
        this.diocesi_id = diocesi_id;
        this.degrees = degrees;
        this.person = person;
        this.foreing_Data = foreing_Data;
        this.diocesi_name = diocesi_name;
    }
    static fromdb(object) {
        const { id, apostleships, stage, location, Ministery, status, parish_id, diocesi_id } = object;
        return new SeminarianEntity(id, apostleships, location, Ministery, stage, status, parish_id, diocesi_id);
    }
}
exports.SeminarianEntity = SeminarianEntity;
var seminarian_status_enum;
(function (seminarian_status_enum) {
    seminarian_status_enum["ACTIVO"] = "ACTIVO";
    seminarian_status_enum["RETIRADO"] = "RETIRADO";
    seminarian_status_enum["PASTORAL"] = "A\u00D1O PASTORAL";
    seminarian_status_enum["CULMINADO"] = "CULMINADO";
})(seminarian_status_enum || (exports.seminarian_status_enum = seminarian_status_enum = {}));
var Locations_enum;
(function (Locations_enum) {
    Locations_enum["EXTERNO"] = "EXTERNO";
    Locations_enum["INTERNO"] = "INTERNO";
})(Locations_enum || (exports.Locations_enum = Locations_enum = {}));
var seminarianMinistery_ENUM;
(function (seminarianMinistery_ENUM) {
    seminarianMinistery_ENUM["UNKOWN"] = "UNKOWN";
    seminarianMinistery_ENUM["ADMISI_N"] = "ADMISION";
    seminarianMinistery_ENUM["LECTORADO"] = "LECTORADO";
    seminarianMinistery_ENUM["ACOLITADO"] = "ACOLITADO";
})(seminarianMinistery_ENUM || (exports.seminarianMinistery_ENUM = seminarianMinistery_ENUM = {}));
