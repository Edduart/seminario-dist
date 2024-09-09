"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_service_1 = require("../services/upload.service");
const infrastructure_1 = require("../../infrastructure");
const professor_controller_1 = require("../professor/professor.controller");
const TokenValidator_1 = require("../services/TokenValidator");
const router = (0, express_1.Router)();
const instructorDataSource = new infrastructure_1.InstructorDataSourceImple();
const instructorRepository = new infrastructure_1.InstructorRepositoryImpl(instructorDataSource);
const dataSource = new infrastructure_1.ProfessorDataSourceImpl();
const repository = new infrastructure_1.ProfessorRepositoryImpl(dataSource);
const professorController = new professor_controller_1.ProfessorController(repository, instructorRepository);
router.get("/ficha/:id", TokenValidator_1.ValidatorTo.ValidarToken, professorController.ficha);
router.get("/", TokenValidator_1.ValidatorTo.ValidarToken, professorController.get);
router.post("/:id", TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res) => {
    upload_service_1.uploadFile.single("file")(req, res, (err) => {
        if (err) {
            console.log("error file size");
            res.status(400).json({ ImageError1: err.message });
        }
        else {
            if (!req.file) {
                req.body.ayuda = "images" + req.baseUrl + req.url + ".jpeg";
                console.log("no file", req.body.ayuda);
            }
            professorController.create(req, res);
        }
    });
});
router.put("/:id", TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res) => {
    upload_service_1.updateFile.single("file")(req, res, (err) => {
        if (err) {
            console.log("error multer");
            res.status(400).json({ ImageError: err.message });
        }
        else {
            if (!req.file) {
                req.body.ayuda = "images" + req.baseUrl + req.url;
                console.log("no file", req.body.ayuda);
            }
            professorController.update(req, res);
        }
    });
});
router.delete("/:id", TokenValidator_1.ValidatorTo.ValidarToken, professorController.delete);
module.exports = router;
