"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraController = void 0;
const domain_1 = require("../../domain");
const permissionValidator_1 = require("../services/permissionValidator");
class ExtraController {
    Blood(req, res) {
        try {
            const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", "R");
            res.json(domain_1.BloodType).send;
        }
        catch (error) {
            res.status(400).json("Acces denied");
        }
    }
    Work(req, res) {
        try {
            const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", "R");
            res.json(domain_1.Job_Psotion_Enum);
        }
        catch (error) {
            res.status(400).json("Acces denied");
        }
    }
    GetInstructors(req, res) {
        try {
            const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", "R");
            res.json(domain_1.InstructorPostion);
        }
        catch (error) {
            res.status(400).json("Acces denied");
        }
    }
    getEnrollmentStatusEnum(req, res) {
        try {
            const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", "R");
            res.json(domain_1.EnrollmentStatus);
        }
        catch (error) {
            res.status(400).json("Acces denied");
        }
    }
}
exports.ExtraController = ExtraController;
