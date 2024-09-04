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
exports.CreateSeminarianList = void 0;
const pdfkit_table_1 = __importDefault(require("pdfkit-table"));
function CreateSeminarianList(dataCB, endCB, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = new pdfkit_table_1.default({ font: 'Times-Roman' });
        doc.on("data", dataCB);
        doc.on("end", endCB);
        let datos_abuscar = [];
        data.forEach(element => {
            datos_abuscar.push([
                element.person.id,
                element.person.forename,
                element.person.surname,
                element.person.email,
                element.diocesi_name
            ]);
        });
        const table = {
            headers: [
                { label: 'CÉDULA', headerColor: "#FFFFFF" },
                { label: 'NOMBRES', headerColor: '#FFFFFF' },
                { label: 'APELLIDOS', headerColor: '#FFFFFF' },
                { label: 'CORREO', headerColor: '#FFFFFF' },
                { label: 'DIÓCESIS', headerColor: '#FFFFFF' },
            ],
            rows: datos_abuscar
        };
        yield doc.table(table, {
            divider: {
                horizontal: { disabled: true },
                header: { disabled: true }
            },
            columnSpacing: 10,
            columnsSize: [80, 100, 80, 140, 100]
        });
        doc.end();
    });
}
exports.CreateSeminarianList = CreateSeminarianList;
