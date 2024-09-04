"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorCreateWorker = void 0;
const express_validator_1 = require("express-validator");
const handler_1 = __importDefault(require("./assests/handler"));
exports.ValidatorCreateWorker = [
    (0, express_validator_1.check)('data.persona.id')
        .matches(/^V-\d{15}$/)
        .withMessage("La cedula es requerida"),
    (0, express_validator_1.check)('data.persona.forename')
        .isLength({ min: 1, max: 100 })
        .withMessage("El nombre es requerido"),
    (0, express_validator_1.check)('data.persona.surname')
        .isLength({ min: 1, max: 100 })
        .withMessage("El apellido es requerido"),
    (0, express_validator_1.check)('data.persona.email')
        .isLength({ min: 6, max: 200 })
        .withMessage("El email es requerido"),
    (req, res, next) => {
        return (0, handler_1.default)(req, res, next);
    }
];
