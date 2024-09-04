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
exports.BuildPensum = void 0;
const pdfkit_table_1 = __importDefault(require("pdfkit-table"));
function BuildPensum(dataCB, endCB, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = new pdfkit_table_1.default({ font: 'Times-Roman' });
        try {
            doc.image('./images/assests/backgproundcolored.png', 25, 65, {
                fit: [100, 100],
                align: 'right',
            });
        }
        catch (error) {
            doc.text('Error en el icono', 25, 65);
        }
        try {
            doc.image('./images/assests/shield.jpg', 500, 65, {
                fit: [100, 100],
                align: 'right',
            });
        }
        catch (error) {
            doc.text('Error en el escudo', 500, 65);
        }
        doc.font('Times-Bold', 12).text("PLANES DE ESTUDIO", { align: 'center' });
        doc.font('Times-Roman', 12);
        doc.on("data", dataCB);
        doc.on("end", endCB);
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        data.forEach((actual) => __awaiter(this, void 0, void 0, function* () {
            let materias = [];
            actual.subjects.forEach(element => {
                materias.push([element.name, element.preceden]);
            });
            const table = {
                title: actual.name,
                headers: [{ label: 'ASIGNATURA', property: 'area', headerColor: 'blue' }, { label: 'PRECEDIDA POR', property: 'asignatura', headerColor: 'blue' }],
                rows: materias
            };
            yield doc.table(table, {});
        }));
        doc.end();
    });
}
exports.BuildPensum = BuildPensum;
