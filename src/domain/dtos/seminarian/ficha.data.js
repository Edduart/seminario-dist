"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaDTO = exports.SeminarianFichaDTO = void 0;
class SeminarianFichaDTO {
    constructor(id, picture, forename, surname, birthdate, etapa, curso, parish, diocese, cellphone, redes, location, instruction_grade, ministery) {
        this.id = id;
        this.picture = picture;
        this.forename = forename;
        this.surname = surname;
        this.birthdate = birthdate;
        this.etapa = etapa;
        this.curso = curso;
        this.parish = parish;
        this.diocese = diocese;
        this.cellphone = cellphone;
        this.redes = redes;
        this.location = location;
        this.instruction_grade = instruction_grade;
        this.ministery = ministery;
    }
}
exports.SeminarianFichaDTO = SeminarianFichaDTO;
class SocialMediaDTO {
    constructor(description, link) {
        this.description = description;
        this.link = link;
    }
}
exports.SocialMediaDTO = SocialMediaDTO;
