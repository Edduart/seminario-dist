"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getmonth = exports.BuildNotas = void 0;
const pdfkit_table_1 = __importDefault(require("pdfkit-table"));
function BuildNotas(dataCB, endCB, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const doc = new pdfkit_table_1.default({ font: 'Times-Roman' });
        doc.font('Times-Roman', 12);
        doc.moveDown();
        doc.moveDown();
        doc.font('Times-Bold', 12).text("Arquidiósis de Barquisimeto", { align: 'center' });
        doc.font('Times-Bold', 12).text('Instituto de Estudios Superiores "Divina Pastora" ', { align: 'center' });
        doc.font('Times-Bold', 12).text("Dirección de Estudios", { align: 'center' });
        doc.moveDown();
        doc.font('Times-Bold', 12).text("CERTIFICADO DE CALIFICACIONES", { align: 'center' });
        doc.moveDown();
        doc.font('Times-Roman', 12).text('El suscrito en su carácter de Control de Estudio del Instituto de Estudios Superiores "Divina Pastora", certifica por medio de la presente que:', { indent: 30, });
        doc.moveDown();
        data[0].seminarian_surname = data[0].seminarian_surname.toLowerCase();
        let nombre = data[0].seminarian_surname.split(" ");
        let surname_fixed = "";
        nombre.forEach(actual => {
            surname_fixed = surname_fixed + actual[0].toUpperCase() + actual.slice(1) + " ";
        });
        data[0].seminarian_forename = data[0].seminarian_forename.toLowerCase();
        let apellido = data[0].seminarian_forename.split(" ");
        let forename_fixed = "";
        apellido.forEach(actual => {
            const frist = forename_fixed = forename_fixed + actual[0].toUpperCase() + actual.slice(1) + " ";
        });
        doc.font('Times-Roman', 12).text(forename_fixed + surname_fixed, { align: 'center' });
        doc.moveDown();
        doc.moveDown();
        let startinyear = (_a = data[0].enrollment[0].start_date) === null || _a === void 0 ? void 0 : _a.split('-')[0];
        let endyeard = (_b = data[0].enrollment[data[0].enrollment.length - 1].end_date) === null || _b === void 0 ? void 0 : _b.split('-')[0];
        doc.font('Times-Roman', 12).text("Portador de la C.I.Nº:" + data[0].seminarian_id + " cursó en este Instituto materias de FILOSOFIA durante el período académico " + startinyear + "-" + endyeard + " obteniendo las siguientes calificaciones según el pénsum que a continuación se especifica.", { indent: 30, });
        doc.on("data", dataCB);
        doc.on("end", endCB);
        doc.moveDown();
        let materias = [];
        data[0].enrollment.forEach(element => {
            var _a, _b;
            materias.push([
                element.subject_name,
                element.subject_total_score_out_of_graded_scored_10_scale,
                ((_a = element.start_date) === null || _a === void 0 ? void 0 : _a.split("-")[0]) +
                    "-" +
                    ((_b = element.end_date) === null || _b === void 0 ? void 0 : _b.split("-")[0]),
            ]);
        });
        doc.font('Times-Roman', 16);
        const table = {
            headers: [{ label: '   Asignatura', headerColor: "#FFFFFF" }, { label: '  Nota', property: 'nota', headerColor: '#FFFFFF' },
                { label: '  Período', property: 'periodo', headerColor: '#FFFFFF' }],
            rows: materias,
        };
        yield doc.table(table, {
            divider: {
                horizontal: { disabled: true },
                header: { disabled: true }
            },
            columnSpacing: 10,
            columnsSize: [350, 40, 50],
            prepareHeader: () => doc.font('Times-Bold', 12),
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => doc.font('Times-Roman', 12),
        });
        doc.font('Times-Roman', 12).text("La escala de calificaciones es del UNO (01) al DIEZ (10) y la nota mínima aprobatoria es de SEIS (06) puntos.", { indent: 30, });
        doc.moveDown();
        let date = new Date();
        let day = date.getDay();
        let month = Getmonth(date.getMonth());
        let year = date.getFullYear();
        doc.font('Times-Roman', 12).text("Certificación que se expide a petición de la parte interesada, en Barquisimeto, a los " + day + " días del mes de " + month + " " + year + "", { indent: 30, });
        doc.end();
    });
}
exports.BuildNotas = BuildNotas;
function Getmonth(id) {
    switch (id) {
        case 1:
            return "enero";
            break;
        case 2:
            return "febrero";
            break;
        case 3:
            return "marzo";
            break;
        case 4:
            return "abril";
            break;
        case 5:
            return "mayo";
            break;
        case 6:
            return "junio";
            break;
        case 7:
            return "julio";
            break;
        case 8:
            return "agosto";
            break;
        case 9:
            return "septiembre";
            break;
        case 10:
            return "octubre";
            break;
        case 11:
            return "noviembre";
            break;
        case 12:
            return "diciembre";
            break;
        default:
            break;
    }
}
exports.Getmonth = Getmonth;
