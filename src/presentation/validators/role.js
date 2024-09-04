"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorEdit = exports.ValidatorCreateUser = void 0;
const express_validator_1 = require("express-validator");
const handler_1 = __importDefault(require("./assests/handler"));
exports.ValidatorCreateUser = [
    (0, express_validator_1.check)('name', "el nombre es requerido")
        .exists()
        .notEmpty()
        .isLength({ min: 1, max: 100 })
        .isString(),
    (0, express_validator_1.check)('description', "descripcion invalida")
        .isLength({ min: 1 })
        .isString(),
    (0, express_validator_1.check)('numbers')
        .isArray(),
    (req, res, next) => {
        return (0, handler_1.default)(req, res, next);
    }
];
exports.ValidatorEdit = [
    (0, express_validator_1.check)('id', "el id es requerido")
        .isInt({ gt: 1 }),
    (0, express_validator_1.check)('name', "el nombre es requerido")
        .exists()
        .notEmpty()
        .isLength({ min: 1, max: 100 })
        .isString(),
    (0, express_validator_1.check)('description', "descripcion invalida")
        .isLength({ min: 1 })
        .isString(),
    (0, express_validator_1.check)('numbers')
        .isArray(),
    (req, res, next) => {
        return (0, handler_1.default)(req, res, next);
    }
];
