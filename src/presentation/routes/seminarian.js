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
const upload_seminarian_1 = require("../services/upload.seminarian");
const infrastructure_1 = require("../../infrastructure");
const seminarian_controller_1 = require("../seminarian/seminarian.controller");
const router = (0, express_1.Router)();
const datasource = new infrastructure_1.SeminarianDataSourceImpl();
const Repository = new infrastructure_1.SeminarianRepositoryImpl(datasource);
const SeminarianControl = new seminarian_controller_1.SeminarianControler(Repository);
router.get('/ficha/:id', SeminarianControl.ficha);
router.get('/carcaCulmin/:id', SeminarianControl.getCartaCulminacione);
router.get('/constance/:id', SeminarianControl.GetConstance);
router.post('/create/:id', TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res, next) => {
    upload_seminarian_1.profile.single('picture')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(err);
        }
        SeminarianControl.Create(req, res);
    }));
});
router.put('/update/:id', TokenValidator_1.ValidatorTo.ValidarTokenH, (req, res, next) => {
    upload_seminarian_1.profileU.single('picture')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(err);
        }
        SeminarianControl.update(req, res);
    }));
});
router.get('/seminarianlist', TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.CreateList);
router.get('/getsem', TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.get);
router.delete('/:id', TokenValidator_1.ValidatorTo.ValidarToken, SeminarianControl.delete);
module.exports = router;
