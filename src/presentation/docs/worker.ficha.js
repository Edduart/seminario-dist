"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildFichaWorker = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
function BuildFichaWorker(dataCB, endCB, workers) {
    const doc = new pdfkit_1.default({ font: 'Times-Roman' });
    doc.on("data", dataCB);
    doc.on("end", endCB);
    doc.font('Times-Bold', 12);
    const data = workers[0];
    doc.rect(40, 40, 530, 220).stroke();
    doc.rect(42, 42, 525, 20).lineWidth(3)
        .fillOpacity(5)
        .fillAndStroke("#ffff99");
    doc.fillColor("black");
    doc.text("DATOS DEL TRABAJADOR", 45, 47, { align: 'center' });
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
    doc.text("NOMBES: ", 172, 74, { continued: true }).text(data.person.forename);
    try {
        if (data != null) {
            const picture = data.person.profile_picture_path.split("images");
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
    doc.text("APELLIDOS: ", 172, 101, { continued: true }).text(data.person.surname);
    doc.fillColor("black");
    doc.rect(170, 122, 80, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("NATALICIO", 176, 128);
    doc.text(data.person.birthdate.toISOString().split('T')[0], 180, 150);
    doc.rect(258, 122, 114, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("CÉDULA", 268, 128);
    doc.text(data.person.id, 270, 150);
    doc.rect(378, 122, 60, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff");
    doc.fillColor("black");
    doc.text("EDAD", 394, 128);
    const birth_date = new Date(data.person.birthdate);
    const hoy = new Date();
    const years = hoy.getFullYear() - birth_date.getFullYear();
    doc.text(years + " AÑOS", 390, 150);
    doc.rect(42, 210, 140, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("POSICIÓN", 75, 216);
    doc.text(data.position, 50, 235);
    doc.rect(190, 210, 100, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("TELÉFONO", 210, 216);
    let cellpp = "N/A";
    if (data.person.cellpones.length > 0) {
        cellpp = data.person.cellpones[0].phone_number;
    }
    doc.text(cellpp, 200, 235);
    doc.rect(300, 210, 268, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2");
    doc.fillColor("black");
    doc.text("REDES SOCIALES", 320, 216);
    if (data.person.medias.length > 0)
        doc.text(data.person.medias[0].category, 328, 235, { link: data.person.medias[0].link });
    if (data.person.medias.length > 1)
        doc.text(data.person.medias[1].category, 412, 235, { link: data.person.medias[1].link });
    doc.end();
}
exports.BuildFichaWorker = BuildFichaWorker;
