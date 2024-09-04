"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_service_1 = require("../services/upload.service");
const infrastructure_1 = require("../../infrastructure");
const professor_controller_1 = require("../professor/professor.controller");
const router = (0, express_1.Router)();
const instructorDataSource = new infrastructure_1.InstructorDataSourceImple();
const instructorRepository = new infrastructure_1.InstructorRepositoryImpl(instructorDataSource);
const dataSource = new infrastructure_1.ProfessorDataSourceImpl();
const repository = new infrastructure_1.ProfessorRepositoryImpl(dataSource);
const professorController = new professor_controller_1.ProfessorController(repository, instructorRepository);
router.get("/", professorController.get);
router.post("/:id", (req, res, next) => {
    upload_service_1.uploadFile.single("file")(req, res, (err) => {
        if (err) {
            return res
                .status(500)
                .json({ msj: "Unexpected error on the image file", error: err });
        }
        else {
            professorController.create(req, res);
        }
    });
});
router.put("/:id", (req, res, next) => {
    upload_service_1.updateFile.single("file")(req, res, (err) => {
        if (err) {
            return res
                .status(500)
                .json({ msj: "Unexpected error on the image file", error: err });
        }
        else {
            professorController.update(req, res);
        }
    });
});
router.delete("/:id", professorController.delete);
module.exports = router;
