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
exports.InstructionController = void 0;
const domain_1 = require("../../domain");
class InstructionController {
    constructor(repository) {
        this.repository = repository;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [errores, createinstruction] = domain_1.CreateInstruction.CreateDTO(req.body);
            if (errores != undefined) {
                console.log("verification errors:" + errores);
                res.json({ errores });
            }
            else {
                new domain_1.CreateInstructionUseCase(this.repository).execute(createinstruction).then((subject) => {
                    res.json(subject);
                }).catch((error) => {
                    res.status(400).send("unable to create instruction: " + error);
                });
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [errores, createinstruction] = domain_1.GetInstruction.CreateDTO(req.query);
            if (errores != undefined) {
                console.log("verification errors:" + errores);
                res.json({ errores });
            }
            else {
                new domain_1.GetInstructionUseCase(this.repository).execute(createinstruction).then((subject) => {
                    res.json(subject);
                }).catch((error) => {
                    console.log(error);
                    res.status(400).send("unable to get instruction: " + error);
                });
            }
        });
    }
}
exports.InstructionController = InstructionController;
