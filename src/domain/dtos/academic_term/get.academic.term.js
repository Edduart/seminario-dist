"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAcademicTerm = void 0;
const __1 = require("../..");
class GetAcademicTerm {
    constructor(status, fecha, id) {
        this.status = status;
        this.fecha = fecha;
        this.id = id;
    }
    static create(props) {
        let { fecha, status, id } = props;
        if (id !== undefined) {
            id = Number(id);
            if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
                id = undefined;
            }
        }
        if (fecha != undefined) {
            try {
                fecha = new Date(fecha);
            }
            catch (error) {
                console.log("error de fecha" + error);
                fecha = undefined;
            }
        }
        if (status != undefined) {
            status = status;
        }
        else {
            status = __1.academic_term_enum.ACTIVO;
        }
        return new GetAcademicTerm(status, fecha, id);
    }
}
exports.GetAcademicTerm = GetAcademicTerm;
