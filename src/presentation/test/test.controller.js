"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const domain_1 = require("../../domain");
const Notas_Certificadas_1 = require("../docs/Notas.Certificadas");
const seminarialistnote_1 = require("../docs/seminarialistnote");
class TestController {
    constructor(repository) {
        this.repository = repository;
        this.getAverageGradeBySubject = (req, res) => {
            console.log("running getAverageGradeBySubject");
            const [error, getDto] = domain_1.GetAverageGradeBySubjectDto.get(req.query);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetAverageGradeBySubject(this.repository)
                .execute(getDto)
                .then((gradeAverage) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(gradeAverage))
                .catch((error) => res.status(400).json({ error }));
        };
        this.delete = (req, res) => {
            const id = +req.params.id;
            new domain_1.DeleteTest(this.repository)
                .execute(id)
                .then((test) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                msj: "Test ID " + test.id + " disabled!",
                test,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.update = (req, res) => {
            const id = +req.params.id;
            const [error, updateDto] = domain_1.UpdateTestDto.update(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateTest(this.repository)
                .execute(updateDto)
                .then((test) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                msj: "Test in ID:" + (updateDto === null || updateDto === void 0 ? void 0 : updateDto.id) + ", updated!",
                test,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getTestForTestScore = (req, res) => {
            console.log("get test for subject");
            const [error, getDto] = domain_1.GetTestForTestScoreDto.get(req.query);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetTestForTestScore(this.repository)
                .execute(getDto)
                .then((test) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(test))
                .catch((error) => res.status(400).json({ error }));
        };
        this.get = (req, res) => {
            console.log("general get");
            const [error, getDto] = domain_1.GetTestDto.get(req.query);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetTest(this.repository)
                .execute(getDto)
                .then((test) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(test))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getTestBySubject = (req, res) => {
            console.log("get by subject");
            const [error, getDto] = domain_1.GetTestBySubjectDto.get(req.query);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetTestBySubject(this.repository)
                .execute(getDto)
                .then((test) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(test))
                .catch((error) => res.status(400).json({ error }));
        };
        this.SeminarianListWithNotes = (req, res) => {
            const [error, get_dto] = domain_1.GetSeminarianDTO.CreateDTO(req.query);
            if (error != undefined) {
                console.log("verification errors:" + error);
                res.json({ error }).send();
            }
            else {
                new domain_1.GetSeminarianPerNoteUse(this.repository).execute(get_dto).then((seminarians) => {
                    const line = res.writeHead(200, {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": "inline; filename=constance.pdf"
                    });
                    (0, seminarialistnote_1.CreateSeminarianListWithNotes)((data) => line.write(data), () => line.end(), seminarians);
                }).catch((error) => {
                    res.status(418).send("unable to get seminarians: " + error);
                });
            }
        };
        this.notas = (req, res) => {
            const getDto = new domain_1.GetTestBySubjectDto(undefined, req.params.id, undefined, undefined, domain_1.EnrollmentStatus.APROBADO);
            new domain_1.GetTestBySubject(this.repository)
                .execute(getDto)
                .then((test) => {
                console.log(test);
                if (test.length > 0) {
                    const line = res.writeHead(200, {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": "inline; filename=nota.pdf",
                    });
                    (0, Notas_Certificadas_1.BuildNotas)((data) => line.write(data), () => line.end(), test);
                }
                else {
                    res.status(400).json({ error: "Seminarista no encontrado" });
                }
            })
                .catch((error) => res.status(400).json({ error }));
        };
        this.create = (req, res) => {
            const [error, createDto] = domain_1.CreateTestDto.create(req.body);
            console.log("inside create controller", { createDto });
            if (error)
                return res.status(400).json({ msj: "Data validation errors", error });
            new domain_1.CreateTest(this.repository)
                .execute(createDto)
                .then((test) => res
                .set({ "Access-Control-Expose-Headers": "auth" })
                .json({ msj: "Test created successfully", test }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.TestController = TestController;
