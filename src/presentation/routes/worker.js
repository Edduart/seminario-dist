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
const infrastructure_1 = require("../../infrastructure");
const worker_crontroller_1 = require("../worker/worker.crontroller");
const TokenValidator_1 = require("../services/TokenValidator");
const upload_service_1 = require("../services/upload.service");
const router = (0, express_1.Router)();
const datasource = new infrastructure_1.WorkerDataSourceImpl();
const Repository = new infrastructure_1.WorkerRepositoryImpl(datasource);
const WorkerControl = new worker_crontroller_1.WorkerControler(Repository);
router.get("/socials", TokenValidator_1.ValidatorTo.ValidarToken, WorkerControl.GetSocials);
router.post("/:id", TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res, next) => {
    upload_service_1.uploadFile.single("file")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log("error file image");
            res.status(400).json({ ImageError1: err.message });
        }
        else {
            if (!req.file) {
                req.body.ayuda = "images" + req.baseUrl + req.url;
                console.log("no file", req.body.ayuda);
            }
            WorkerControl.create(req, res);
        }
    }));
});
router.put("/:id", TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res, next) => {
    upload_service_1.updateFile.single("file")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log("error multer");
            res.status(400).json({ ImageError: err.message });
        }
        else {
            if (!req.file) {
                req.body.ayuda = "images" + req.baseUrl + req.url;
                console.log("no file", req.body.ayuda);
            }
            WorkerControl.update(req, res);
        }
    }));
});
router.get("/", TokenValidator_1.ValidatorTo.ValidarToken, WorkerControl.get);
router.delete("/:id", TokenValidator_1.ValidatorTo.ValidarToken, WorkerControl.deleteRole);
module.exports = router;
