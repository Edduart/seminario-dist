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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraController = void 0;
const postgres_1 = require("../../data/postgres");
const filterEnum_1 = require("../utils/filterEnum");
const permissionValidator_1 = require("../services/permissionValidator");
const domain_1 = require("../../domain");
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", "R");
                const instructorPositions = yield postgres_1.prisma.instructor.findMany({
                    where: {
                        NOT: { instructor_position: "DESACTIVADO" },
                    },
                    select: { instructor_position: true },
                });
                console.log({ instructorPositions });
                const filteredInstructorPosition = filterEnum_1.FilterEnum.filterInstructorPosition(instructorPositions);
                res.json(filteredInstructorPosition);
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        });
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
