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
exports.ProfessorController = void 0;
const domain_1 = require("../../domain");
const parseData_1 = require("../utils/parseData");
const fs_1 = __importDefault(require("fs"));
const imageManipulation_1 = require("../../presentation/utils/imageManipulation");
const permissionValidator_1 = require("../services/permissionValidator");
const fichaProfessor_1 = require("../docs/fichaProfessor");
class ProfessorController {
    constructor(repository, instructorPositionRepo) {
        this.repository = repository;
        this.instructorPositionRepo = instructorPositionRepo;
        this.ficha = (req, res) => {
            try {
                new domain_1.FichaUsePRofe(this.repository).execute(req.params.id).then((profesor) => {
                    const line = res.writeHead(200, {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": "inline; filename=ficha.pdf"
                    });
                    (0, fichaProfessor_1.BuildFichaProfessor)((data) => line.write(data), () => line.end(), profesor);
                }).catch((error) => {
                    res.status(418).send("unable to create ID: " + error);
                });
            }
            catch (error) {
                res.status(418).send(error);
            }
        };
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const source = req.headers["Permissions"];
                const result = (0, permissionValidator_1.ValidatePermission)(source, "INSTRUCTOR", "U");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            try {
                console.log(req.baseUrl);
                const isInstructor = yield (0, parseData_1.parseInstructorData)(req.body.data);
                const personData = yield (0, parseData_1.parsePersonData)(req.body.data, req.body.ayuda);
                const { userData } = yield (0, parseData_1.parseUserDataUpdate)(req.body.data);
                const professorData = new domain_1.UpdateProfessorDto(personData, userData);
                const dataValidation = yield professorData.DataValidation();
                if (dataValidation) {
                    return res.status(400).send("Error: " + dataValidation);
                }
                let newRole = userData.role_id;
                let dtoUpdateInstructor = null;
                if (isInstructor) {
                    const [error, updateInstructor] = domain_1.UpdateInstructorDto.update(isInstructor);
                    if (error) {
                        return res.status(400).json({ error });
                    }
                    else {
                        newRole = updateInstructor.instructor_role;
                        dtoUpdateInstructor = updateInstructor;
                    }
                }
                yield new domain_1.UpdateProfessor(this.repository)
                    .execute(professorData)
                    .then((professor) => __awaiter(this, void 0, void 0, function* () {
                    let instructorCreateStatus = {};
                    if (isInstructor) {
                        instructorCreateStatus = yield new domain_1.UpdateInstructor(this.instructorPositionRepo)
                            .execute(dtoUpdateInstructor)
                            .then(() => {
                            return {
                                msj: "Profesor creado e instructor creado correctamente!",
                            };
                        })
                            .catch((error) => {
                            return {
                                msj: "Profesor creado, ERROR al crear instructor",
                                error,
                            };
                        });
                    }
                    yield (0, imageManipulation_1.imageResize)(req.body.ayuda);
                    res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                        msj: "Profesor actualizado correctamente",
                        professor,
                    });
                }))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, getDto] = domain_1.GetProfessorDto.GetDto(req.query);
            if (error)
                return res.status(400).json({
                    msj: "There are some validation errors in the given params!",
                    error,
                });
            new domain_1.GetProfessor(this.repository)
                .execute(getDto)
                .then((professor) => res.json(professor))
                .catch((error) => res.status(400).json({ error }));
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const source = req.headers["Permissions"];
                const result = (0, permissionValidator_1.ValidatePermission)(source, "INSTRUCTOR", "C");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            try {
                let dtoCreateInstructor = null;
                const isInstructor = yield (0, parseData_1.parseInstructorData)(req.body.data);
                const personData = yield (0, parseData_1.parsePersonData)(req.body.data, req.body.ayuda);
                const userData = yield (0, parseData_1.parseUserData)(req.body.data, personData);
                const professorData = new domain_1.CreateProfessor(userData);
                userData.role = 4;
                if (isInstructor) {
                    const [error, createInstructor] = domain_1.CreateInstructorDto.create(isInstructor);
                    if (error) {
                        if (fs_1.default.existsSync(req.body.ayuda))
                            fs_1.default.unlinkSync(req.body.ayuda);
                        return res.status(400).json({ error });
                    }
                    else {
                        userData.role = createInstructor === null || createInstructor === void 0 ? void 0 : createInstructor.instructor_role;
                        dtoCreateInstructor = createInstructor;
                    }
                }
                console.log(req.body.ayuda);
                const dataValidationErrors = professorData.Validate();
                if (dataValidationErrors) {
                    if (fs_1.default.existsSync(req.body.ayuda))
                        fs_1.default.unlinkSync(req.body.ayuda);
                    return res.status(400).send("Error: " + dataValidationErrors);
                }
                yield new domain_1.CreateProfessorUseCase(this.repository)
                    .execute(professorData)
                    .then((professor) => __awaiter(this, void 0, void 0, function* () {
                    let instructorCreateStatus = {};
                    if (isInstructor) {
                        instructorCreateStatus = yield new domain_1.CreateInstructor(this.instructorPositionRepo)
                            .execute(dtoCreateInstructor)
                            .then(() => {
                            return {
                                msj: "Profesor creado e instructor creado correctamente!",
                            };
                        })
                            .catch((error) => {
                            console.error(error);
                            return {
                                msj: "Profesor creado, ERROR al crear instructor",
                                error,
                            };
                        });
                    }
                    yield (0, imageManipulation_1.imageResize)(req.body.ayuda);
                    res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                        msj: "Profesor creado correctamente",
                        instructorCreateStatus,
                        professor,
                    });
                }))
                    .catch((error) => {
                    if (fs_1.default.existsSync(req.body.ayuda))
                        fs_1.default.unlinkSync(req.body.ayuda);
                    res.status(400).json({ error });
                });
            }
            catch (error) {
                if (fs_1.default.existsSync(req.body.ayuda))
                    fs_1.default.unlinkSync(req.body.ayuda);
                res.status(400).json({ error });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "INSTRUCTOR", "D");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const id = req.params.id;
            new domain_1.DeleteProfessor(this.repository)
                .execute(id)
                .then((professor) => {
                res.json({ professor });
            })
                .catch((error) => {
                res.status(400).send({ error });
            });
        });
    }
}
exports.ProfessorController = ProfessorController;
