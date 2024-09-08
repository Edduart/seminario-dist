"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorController = void 0;
const domain_1 = require("../../domain");
const ficha_instructor_1 = require("../docs/ficha.instructor");
const permissionValidator_1 = require("../services/permissionValidator");
class InstructorController {
    constructor(instructorRepository) {
        this.instructorRepository = instructorRepository;
        this.ficha = (req, res) => {
            new domain_1.InstructorFichaUseCase(this.instructorRepository).execute(req.params.id).then((seminarians) => {
                const line = res.writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "inline; filename=ficha.pdf"
                });
                (0, ficha_instructor_1.BuildFichaInstructor)((data) => line.write(data), () => line.end(), seminarians);
            }).catch((error) => {
                res.status(418).send("unable to create ID: " + error);
            });
        };
        this.createInstructor = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "INSTRUCTOR", "C");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const [error, createInstructorDto] = domain_1.CreateInstructorDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateInstructor(this.instructorRepository)
                .execute(createInstructorDto)
                .then((instructor) => res.json({ msj: "Instructor creado exitosamente", instructor }))
                .catch((error) => {
                console.log("unexpected error while executing" + error);
                res.status(400).json({ error });
            });
        };
        this.getInstructors = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "INSTRUCTOR", "R");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            new domain_1.GetInstructors(this.instructorRepository)
                .execute()
                .then((instructors) => res.json(instructors))
                .catch((error) => {
                console.log("unexpected error while executing" + error);
                res.status(400).json({ error });
            });
        };
        this.getInstructorById = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "INSTRUCTOR", "R");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const id = req.params.id;
            new domain_1.GetInstructor(this.instructorRepository)
                .execute(id)
                .then((instructor) => {
                console.log(instructor);
                res.json({
                    mjs: "Posicion de instructor ID:" +
                        instructor.professor_id +
                        ", encontrado exitosamente!",
                    instructor,
                });
            })
                .catch((error) => res.status(400).json({ error }));
        };
        this.updateInstructorById = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "INSTRUCTOR", "U");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const professor_id = req.params.id;
            const [error, updateInstructorDto] = domain_1.UpdateInstructorDto.update(Object.assign(Object.assign({}, req.body), { professor_id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateInstructor(this.instructorRepository)
                .execute(updateInstructorDto)
                .then((instructor) => res.json({
                msj: "Instructor ID:" +
                    instructor.professor_id +
                    ", actualizada correctamente!",
                instructor,
            }))
                .catch((error) => {
                console.log("unexpected error while executing" + error);
                res.status(400).json({ error });
            });
        };
        this.deleteInstructor = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "INSTRUCTOR", "D");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const id = req.params.id;
            new domain_1.DeleteInstructor(this.instructorRepository)
                .execute(id)
                .then((instructor) => res.json({
                msj: "Instructor " +
                    instructor.professor_id +
                    " disabled!",
                instructor,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.InstructorController = InstructorController;
