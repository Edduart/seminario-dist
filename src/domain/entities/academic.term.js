"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academic_term_enum = exports.AcademicTermEntityt = void 0;
class AcademicTermEntityt {
    constructor(id, start_date, end_date, status, semester, start_strin, end_string, name) {
        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
        this.semester = semester;
        this.start_strin = start_strin;
        this.end_string = end_string;
        this.name = name;
    }
    static fromObject(object) {
        const { id, start_date, end_date, status, semester } = object;
        const end_typedate = new Date(end_date);
        const start_typedate = new Date(start_date);
        const name = start_typedate.toISOString().split('-')[0] + '-' + end_typedate.toISOString().split('-')[0];
        return new AcademicTermEntityt(id, start_typedate, end_typedate, status, semester, start_typedate.toISOString().split('T')[0], end_typedate.toISOString().split('T')[0], name);
    }
}
exports.AcademicTermEntityt = AcademicTermEntityt;
var academic_term_enum;
(function (academic_term_enum) {
    academic_term_enum["ACTIVO"] = "ACTIVO";
    academic_term_enum["CULMINADO"] = "CULMINADO";
    academic_term_enum["EQUIVALENCIAS"] = "EQUIVALENCIAS";
})(academic_term_enum || (exports.academic_term_enum = academic_term_enum = {}));
