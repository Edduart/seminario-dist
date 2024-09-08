"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioEntity = void 0;
class HorarioEntity {
    constructor(ID, Curso, link) {
        this.ID = ID;
        this.Curso = Curso;
        this.link = link;
    }
    static fromObject(object) {
        const { ID, Curso, link } = object;
        return new HorarioEntity(ID, Curso, link);
    }
}
exports.HorarioEntity = HorarioEntity;
