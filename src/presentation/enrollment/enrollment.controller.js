"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentController = void 0;
const domain_1 = require("../../domain");
class EnrollmentController {
    constructor(repository) {
        this.repository = repository;
        this.getSubjectAllowToEnrollEquivalency = (req, res) => {
            const seminarian_id = req.params.seminarian_id;
            const [error, createDto] = domain_1.SubjectAllowToEnrollEquivalencyDto.get({
                seminarian_id,
            });
            if (error)
                return res.status(400).json({ msj: "Data validation errors", error });
            new domain_1.GetSubjectAllowToEnrollEquivalency(this.repository)
                .execute(createDto)
                .then((enrollment) => res
                .set({ "Access-Control-Expose-Headers": "auth" })
                .json({ enrollment }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.createEnrollmentByEquivalence = (req, res) => {
            const [error, createDto] = domain_1.CreateEnrollmentByEquivalenceDto.create(req.body);
            if (error)
                return res.status(400).json({ msj: "Data validation errors", error });
            new domain_1.CreateEnrollmentByEquivalence(this.repository)
                .execute(createDto)
                .then((enrollment) => res
                .set({ "Access-Control-Expose-Headers": "auth" })
                .json({ msj: "Enrollment successful", enrollment }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getStageOfSeminarian = (req, res) => {
            const [error, getDto] = domain_1.GetStageOfSeminarianDto.get(req.query);
            if (error)
                return res.status(400).json({ error });
            new domain_1.getStageOfSeminarian(this.repository)
                .execute(getDto)
                .then((enrollment) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(enrollment))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getAcademicStatus = (req, res) => {
            console.log("academic status get");
            const seminarian_id = req.params.seminarian_id;
            const [error, getDto] = domain_1.GetAcademicStatusDto.get({ seminarian_id });
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetAcademicStatus(this.repository)
                .execute(getDto)
                .then((enrollment) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(enrollment))
                .catch((error) => res.status(400).json({ error }));
        };
        this.get = (req, res) => {
            console.log("general get");
            const [error, getDto] = domain_1.GetEnrollmentDto.get(req.query);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetEnrollment(this.repository)
                .execute(getDto)
                .then((enrollment) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(enrollment))
                .catch((error) => res.status(400).json({ error }));
        };
        this.update = (req, res) => {
            const enrollment_id = +req.params.id;
            const [error, updateDto] = domain_1.UpdateEnrollmentDto.update(Object.assign(Object.assign({}, req.body), { enrollment_id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateEnrollment(this.repository)
                .execute(updateDto)
                .then((enrollment) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                msj: "Enrollment in subject updated!",
                enrollment,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.create = (req, res) => {
            const [error, createDto] = domain_1.CreateEnrollmentDto.create(req.body);
            if (error)
                return res.status(400).json({ msj: "Data validation errors", error });
            new domain_1.CreateEnrollment(this.repository)
                .execute(createDto)
                .then((enrollment) => res
                .set({ "Access-Control-Expose-Headers": "auth" })
                .json({ msj: "Enrollment successful", enrollment }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.delete = (req, res) => {
            const id = +req.params.id;
            new domain_1.DeleteEnrollment(this.repository)
                .execute(id)
                .then((Enrollment) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                msj: "Enrollment of subject ID " + Enrollment.subject_id + " disabled!",
                Enrollment,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.EnrollmentController = EnrollmentController;
