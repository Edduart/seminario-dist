"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildFicha = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
function BuildFicha(dataCB, endCB, data) {
    var _a;
    const doc = new pdfkit_1.default({ font: 'Times-Roman' });
    doc.on("data", dataCB);
    doc.on("end", endCB);
    doc.font('Times-Bold', 12);
    doc.rect(40, 40, 530, 356).stroke();
    doc.rect(42, 42, 525, 20).lineWidth(3)
        .fillOpacity(5)
        .fillAndStroke("#ffff99");
    doc.fillColor("black");
    doc.text("DATOS DEL SEMINARISTA", 45, 47, { align: 'center' });
    try {
        doc.image('./images/assests/seminary.icon.png', 55, 65, {
            fit: [100, 100],
            align: 'right',
        });
    }
    catch (error) {
        doc.text('Error en el icono', 55, 65);
    }
    doc.font('Times-Bold', 10).text("SEMINARIO PROVINCIAL", 50, 185);
    doc.text("DIVINA PASTORA", 65);
    doc.font('Times-Bold', 12);
    doc.rect(170, 68, 268, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("NOMBES: ", 172, 74, { continued: true }).text(data.forename);
    try {
        if (data.picture != null) {
            const picture = data.picture.split("images");
            const path = "./images" + picture[1];
            doc.image(path, 442, 65, {
                width: 140,
                height: 140,
                fit: [160, 140],
            });
        }
        else {
            doc.text('Seminarista no tiene foto', 442, 65);
        }
    }
    catch (error) {
        doc.text('Error en la foto del seminarista', 442, 65);
    }
    doc.rect(170, 95, 268, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("APELLIDOS: ", 172, 101, { continued: true }).text(data.surname);
    doc.fillColor("black");
    doc.rect(170, 122, 80, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("NATALICIO", 176, 128);
    doc.text(data.birthdate.toISOString().split('T')[0], 180, 150);
    doc.rect(258, 122, 114, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("CÉDULA", 268, 128);
    doc.text(data.id, 270, 150);
    doc.rect(378, 122, 60, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("EDAD", 394, 128);
    const birth_date = new Date(data.birthdate);
    const hoy = new Date();
    const years = hoy.getFullYear() - birth_date.getFullYear();
    doc.text(years + " AÑOS", 390, 150);
    doc.rect(42, 210, 140, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("ETAPA", 75, 216);
    doc.text(data.etapa, 50, 235);
    doc.rect(188, 210, 104, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("CURSO", 190, 216);
    doc.text(data.curso, 194, 235);
    doc.rect(298, 210, 269, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("DIÓCESIS", 320, 216);
    doc.text(data.diocese, 300, 235);
    doc.rect(42, 260, 300, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("PARROQUIA", 148, 266);
    doc.text(data.parish, 46, 294);
    doc.rect(348, 260, 219, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("TELÉFONO", 352, 266);
    let cellpp = "N/A";
    if (((_a = data.cellphone) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        cellpp = data.cellphone[0];
    }
    doc.text(cellpp, 420, 286);
    doc.rect(42, 310, 525, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("REDES SOCIALES", 240, 316);
    if (data.redes.length > 0)
        doc.text(data.redes[0].description, 42, 334, { link: data.redes[0].link });
    if (data.redes.length > 1)
        doc.text(data.redes[1].description, 124, 334, { link: data.redes[1].link });
    if (data.redes.length > 2)
        doc.text(data.redes[2].description, 220, 334, { link: data.redes[2].link });
    if (data.redes.length > 3)
        doc.text(data.redes[3].description, 310, 334, { link: data.redes[3].link });
    if (data.redes.length > 4)
        doc.text(data.redes[4].description, 420, 334, { link: data.redes[4].link });
    doc.rect(42, 350, 80, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("CONDICIÓN", 46, 356);
    doc.text(data.location, 50, 376);
    doc.rect(128, 350, 180, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("GRADO DE INSTRUCCION", 140, 356);
    doc.text(data.instruction_grade, 176, 376);
    doc.rect(312, 350, 254, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("MINISTERIOS CONFERIDOS", 360, 356);
    doc.text(data.ministery, 410, 376);
    doc.end();
}
exports.BuildFicha = BuildFicha;
