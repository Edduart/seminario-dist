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
exports.SubjectControler = void 0;
const domain_1 = require("../../domain");
const permissionValidator_1 = require("../services/permissionValidator");
const pensum_1 = require("../docs/pensum");
class SubjectControler {
    constructor(repository) {
        this.repository = repository;
        this.Delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "SUBJECT", 'D');
                const number_aux = Number(req.params.id);
                if (Number.isNaN(number_aux)) {
                    console.log("verification errors: id must be a number");
                    res.json("verification errors: id must be a number").send();
                }
                else {
                    new domain_1.DeleteSubjectUseCase(this.repository).execute(number_aux).then((subject) => {
                        res.json(subject).send;
                    })
                        .catch((error) => { res.status(403).send("unable to get subjects: " + error); });
                }
            }
            catch (error) {
                res.status(401).send("Error: " + error);
            }
        });
        this.Get_Field = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                new domain_1.GetFieldstUseCase(this.repository).execute().then((subjects) => { res.json(subjects).send; })
                    .catch((error) => { res.status(400).send("unable to get fields: " + error); });
            }
            catch (error) {
                res.status(401).send("Error: " + error);
            }
        });
        this.Get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "SUBJECT", 'R');
                const [error, get_dto] = domain_1.GetSubjectDTO.CreateDTO(req.query);
                if (error != undefined) {
                    console.log("verification errors:" + error);
                    res.json({ error }).send();
                }
                else {
                    if (get_dto != undefined) {
                        new domain_1.GetSubjectUseCase(this.repository).execute(get_dto).then((subjects) => {
                            res.json(subjects).send;
                        })
                            .catch((error) => { res.status(400).send("unable to get subjects: " + error); });
                    }
                }
            }
            catch (error) {
                res.status(401).send("Error: " + error);
            }
        });
        this.Update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "SUBJECT", 'U');
                const [error, get_dto] = domain_1.UpdateSubjectDTO.CreateDTO(req.body);
                if (error != undefined) {
                    console.log("verification errors:" + error);
                    res.json({ error }).send();
                }
                else {
                    if (get_dto != undefined) {
                        new domain_1.UpdateSubjectUseCase(this.repository).execute(get_dto).then((subject) => {
                            res.json(subject).send;
                        }).catch((error) => {
                            res.status(400).send("unable to create subject: " + error);
                        });
                    }
                }
            }
            catch (error) {
                res.status(401).send("Error: " + error);
            }
        });
        this.Create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "SUBJECT", 'C');
                const [errores, createsubdto] = domain_1.CreateSubjectDTO.CreateDTO(req.body);
                if (errores != undefined) {
                    console.log("verification errors:" + errores);
                    res.json({ errores }).send();
                }
                else {
                    if (createsubdto != undefined) {
                        new domain_1.CreateSubjectUseCase(this.repository).execute(createsubdto).then((subject) => {
                            res.json(subject).send;
                        }).catch((error) => {
                            res.status(400).send("unable to create subject: " + error);
                        });
                    }
                }
            }
            catch (error) {
                res.status(401).send("Error: " + error);
            }
        });
        this.Pensum = (req, res) => __awaiter(this, void 0, void 0, function* () {
            new domain_1.PensumSubjectUseCase(this.repository).execute().then((data) => {
                const line = res.writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "inline; filename=ficha.pdf"
                });
                (0, pensum_1.BuildPensum)((data) => line.write(data), () => line.end(), data);
            }).catch((error) => { res.status(400).send("unable to get pensum: " + error); });
        });
        this.Get_inst = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, get_dto] = domain_1.GetSubjectDTO.CreateDTO(req.query);
                if (error != undefined) {
                    console.log("verification errors:" + error);
                    res.json({ error }).send();
                }
                else {
                    if (get_dto != undefined) {
                        new domain_1.GetSubjecInsttUseCase(this.repository).execute(get_dto).then((subjects) => {
                            res.json(subjects).send;
                        });
                    }
                }
            }
            catch (error) {
            }
        });
    }
}
exports.SubjectControler = SubjectControler;
