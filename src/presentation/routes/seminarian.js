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
const express_1 = require("express");
const TokenValidator_1 = require("../services/TokenValidator");
const infrastructure_1 = require("../../infrastructure");
const seminarian_controller_1 = require("../seminarian/seminarian.controller");
const upload_service_1 = require("../services/upload.service");
const router = (0, express_1.Router)();
const datasource = new infrastructure_1.SeminarianDataSourceImpl();
const Repository = new infrastructure_1.SeminarianRepositoryImpl(datasource);
const SeminarianControl = new seminarian_controller_1.SeminarianControler(Repository);
router.get("/ficha/:id", TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.ficha);
router.get("/carcaCulmin/:id", TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.getCartaCulminacione);
router.get("/constance/:id", TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.GetConstance);
router.post("/create/:id", TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res) => {
    upload_service_1.uploadFile.single("picture")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(400).json({ ImageError: err.message });
        }
        else {
            if (!req.file) {
                const preparePath = "images" + req.baseUrl + req.url;
                const newImagePath = preparePath.replace("/create/", "/");
                req.body.ayuda = newImagePath;
                console.log("no file", req.body.ayuda);
            }
            SeminarianControl.Create(req, res);
        }
    }));
});
router.put("/update/:id", TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res) => {
    upload_service_1.updateFile.single("picture")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(400).json({ ImageError: err.message });
        }
        else {
            SeminarianControl.update(req, res);
        }
    }));
});
router.get("/seminarianlist", TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.CreateList);
router.get("/getsem", TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.get);
router.delete("/:id", TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.delete);
module.exports = router;
