"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAcademicTerm = void 0;
class CreateAcademicTerm {
    constructor(start_date, end_date) {
        this.start_date = start_date;
        this.end_date = end_date;
    }
    static create(props) {
        let error_array = [];
        const { start_date, end_date } = props;
        let starting_date = new Date();
        let ending_date = new Date();
        try {
            starting_date = new Date(start_date);
        }
        catch (error) {
            error_array.push("la fecha de inicio es una fecha invalida");
        }
        try {
            ending_date = new Date(end_date);
        }
        catch (error) {
            error_array.push("la fecha de finalizacion es una fecha invalida");
        }
        if (ending_date < starting_date)
            error_array.push("la fecha de finalizacion debe ser mayor a la de inicio");
        let date_dif = starting_date;
        date_dif.setMonth(date_dif.getMonth() + 3);
        if (date_dif > ending_date)
            error_array.push("el minimo de duracion de un periodo son 3 meses");
        if (error_array.length > 0)
            return [error_array.join(", "), undefined];
        return [undefined, new CreateAcademicTerm(starting_date, ending_date)];
    }
}
exports.CreateAcademicTerm = CreateAcademicTerm;
