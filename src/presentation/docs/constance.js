"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildConstance = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const Notas_Certificadas_1 = require("./Notas.Certificadas");
function BuildConstance(dataCB, endCB, infor, surname, forename, period, etapa, nombre_emisor, cedula_emisor) {
    const doc = new pdfkit_1.default({ font: 'Times-Roman' });
    try {
        doc.image("./images/assests/backgpround.png", 110, 150, {
            align: 'center',
        });
    }
    catch (error) {
        doc.text('Error en el fondo', 110, 150);
    }
    surname = surname.toLowerCase();
    let nombre = surname.split(" ");
    let surname_fixed = "";
    nombre.forEach(actual => {
        surname_fixed = surname_fixed + actual[0].toUpperCase() + actual.slice(1) + " ";
    });
    forename = forename.toLowerCase();
    let apellido = forename.split(" ");
    let forename_fixed = "";
    apellido.forEach(actual => {
        const frist = forename_fixed = forename_fixed + actual[0].toUpperCase() + actual.slice(1) + " ";
    });
    surname = surname_fixed;
    forename = forename_fixed;
    doc.on("data", dataCB);
    doc.on("end", endCB);
    try {
        doc.image('./images/assests/seminary.icon.png', {
            fit: [100, 100],
            align: 'right'
        });
    }
    catch (error) {
        doc.text('Error en el icono', 10, 10);
    }
    doc.font('Times-Bold', 12).text('Arquidiócesis de Barquisimeto', { align: 'center' });
    doc.font('Times-Bold', 12).text('Instituto de Estudios Superiores “Divina Pastora”', { align: 'center' });
    doc.font('Times-Bold', 12).text('Dirección de Estudios', { align: 'center' });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Bold', 12).text('CONSTANCIA DE ESTUDIOS', { align: 'center', });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 12).text('El suscrito en su carácter de Rector del Instituto de Estudios Superiores “Divina Pastora”, certifica por medio de la presente que:', { indent: 30 });
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 18).text(surname + ', ' + forename, { align: 'center' });
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 12).text("Portador de la C.I. Nº:" + infor + " está inscrito en el lapso académico " + period + ", de " + etapa + ".", {
        indent: 30
    });
    doc.moveDown();
    doc.moveDown();
    let date = new Date();
    let day = date.getDay();
    let month = (0, Notas_Certificadas_1.Getmonth)(date.getMonth());
    let year = date.getFullYear();
    doc.text("Dado en la Ciudad de Barquisimeto, a los " + day + " Días del Mes de " + month + " del Año " + year + ".", {
        align: 'justify',
        indent: 30
    });
    doc.text("Certificación que se expide a petición de la parte interesada, en Barquisimeto, a los " + day + " días del mes de " + month + " del " + year + ".", { indent: 30 });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Bold', 12).text(nombre_emisor, { align: 'center' });
    doc.font('Times-Bold', 12).text(cedula_emisor, { align: 'center' });
    doc.font('Times-Bold', 12).text('Rector', { align: 'center' });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 10).text('El Manzano Vía río Claro Km 4. Apdo. - 321. Barquisimeto -Venezuela. Telefax - (0251)2325897.', { align: 'center', });
    doc.font('Times-Roman', 10).text('E-mail: centrodeestudios.sdp@cantv.net', { align: 'center' });
    doc.moveTo(50, 680).lineTo(doc.page.width - 50, 680).stroke();
    doc.end();
}
exports.BuildConstance = BuildConstance;
