"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorLogin = void 0;
const express_validator_1 = require("express-validator");
const handler_1 = __importDefault(require("./assests/handler"));
exports.ValidatorLogin = [
    (0, express_validator_1.check)('id', "ID requerido")
        .exists()
        .notEmpty()
        .isLength({ min: 1, max: 20 })
        .isString(),
    (0, express_validator_1.check)('password', "contraseña requerida")
        .isLength({ min: 1, max: 40 })
        .isString(),
    (req, res, next) => {
        return (0, handler_1.default)(req, res, next);
    }
];
