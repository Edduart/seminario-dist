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
class ProfessorController {
    constructor(repository, instructorPositionRepo) {
        this.repository = repository;
        this.instructorPositionRepo = instructorPositionRepo;
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.baseUrl);
            const isInstructor = yield (0, parseData_1.parseInstructorData)(req.body.data);
            const personData = yield (0, parseData_1.parsePersonData)(req.body.data, req.body.ayuda);
            const { userData } = yield (0, parseData_1.parseUserDataUpdate)(req.body.data);
            const professorData = new domain_1.UpdateProfessorDto(personData, userData);
            const dataValidation = yield professorData.DataValidation();
            if (dataValidation) {
                if (req.body.ayuda != null) {
                    fs_1.default.unlinkSync(req.body.ayuda);
                }
                return res.status(400).send("Error: " + dataValidation);
            }
            let dtoUpdateInstructor = null;
            if (isInstructor) {
                const [error, updateInstructor] = domain_1.UpdateInstructorDto.update(isInstructor);
                if (error) {
                    if (req.body.ayuda != null) {
                        fs_1.default.unlinkSync(req.body.ayuda);
                    }
                    return res.status(400).json({ error });
                }
                else {
                    dtoUpdateInstructor = updateInstructor;
                }
            }
            const updateProfessor = yield new domain_1.UpdateProfessor(this.repository)
                .execute(professorData)
                .then((professor) => {
                if (isInstructor) {
                    new domain_1.UpdateInstructor(this.instructorPositionRepo)
                        .execute(dtoUpdateInstructor)
                        .catch((error) => {
                        console.error(error);
                    });
                }
                res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                    msj: "Profesor actualizado correctamente",
                    professor,
                });
            })
                .catch((error) => res.status(400).json({ error }));
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
            let dtoCreateInstructor = null;
            const isInstructor = yield (0, parseData_1.parseInstructorData)(req.body.data);
            const personData = yield (0, parseData_1.parsePersonData)(req.body.data, req.body.ayuda);
            const userData = yield (0, parseData_1.parseUserData)(req.body.data, personData);
            const professorData = new domain_1.CreateProfessor(userData);
            userData.role = 4;
            if (isInstructor) {
                const [error, createInstructor] = domain_1.CreateInstructorDto.create(isInstructor);
                if (error) {
                    fs_1.default.unlinkSync(req.body.ayuda);
                    return res.status(400).json({ error });
                }
                else {
                    userData.role = createInstructor === null || createInstructor === void 0 ? void 0 : createInstructor.instructor_role;
                    dtoCreateInstructor = createInstructor;
                }
            }
            console.log(req.body.ayuda);
            yield (0, imageManipulation_1.imageResize)(req.body.ayuda);
            const dataValidationErrors = professorData.Validate();
            if (dataValidationErrors) {
                fs_1.default.unlinkSync(req.body.ayuda);
                return res.status(400).send("Error: " + dataValidationErrors);
            }
            yield new domain_1.CreateProfessorUseCase(this.repository)
                .execute(professorData)
                .then((professor) => {
                if (isInstructor) {
                    new domain_1.CreateInstructor(this.instructorPositionRepo)
                        .execute(dtoCreateInstructor)
                        .catch((error) => {
                        console.error(error);
                    });
                }
                res
                    .set({ "Access-Control-Expose-Headers": "auth" })
                    .json({ msj: "Profesor creado correctamente", professor });
            })
                .catch((error) => res.status(400).json({ error }));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            new domain_1.DeleteProfessor(this.repository)
                .execute(id)
                .then((Professor) => {
                if (req.body.ayuda != null) {
                    fs_1.default.unlinkSync(req.body.ayuda);
                }
                res.json({ Professor }).send;
            })
                .catch((error) => {
                res.status(418).send({ error });
            });
        });
    }
}
exports.ProfessorController = ProfessorController;
