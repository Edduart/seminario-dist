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
exports.AcademicTermController = void 0;
const domain_1 = require("../../domain");
const permissionValidator_1 = require("../services/permissionValidator");
class AcademicTermController {
    constructor(repository, enrollmentRepository) {
        this.repository = repository;
        this.enrollmentRepository = enrollmentRepository;
        this.Create = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "STAGE", "C");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const [error_Arr, academicCreateDTO] = domain_1.CreateAcademicTerm.create(req.body);
            if (academicCreateDTO != undefined) {
                new domain_1.CreateAcademicTermUseCase(this.repository)
                    .execute(academicCreateDTO)
                    .then((academic) => {
                    return res.status(200).json(academic);
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(400).json("Error creando periodos" + error);
                });
            }
            else {
                console.log(error_Arr);
                return res.status(400).json({ error_Arr });
            }
        };
        this.Get = (req, res) => {
            const get_dto = domain_1.GetAcademicTerm.create(req.query);
            new domain_1.GetAcademicTermUseCase(this.repository)
                .execute(get_dto)
                .then((results) => {
                return res.status(200).json(results);
            })
                .catch((error) => {
                console.log(error);
                return res.status(400).json("Error obteniendo periodos" + error);
            });
        };
        this.Getid = (req, res) => {
            const get_dto = domain_1.GetAcademicTerm.create(req.params);
            new domain_1.GetbyidAcademicTermUseCase(this.repository)
                .execute(get_dto)
                .then((results) => {
                return res.status(200).json(results);
            })
                .catch((error) => {
                console.log(error);
                return res.status(400).json("Error obteniendo periodos" + error);
            });
        };
        this.Update = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "STAGE", "U");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            new domain_1.updateAcademicTermUseCase(this.repository)
                .execute(req.body.id)
                .then((academic) => {
                return res.status(200).json(academic);
            })
                .catch((error) => {
                return res.status(400).json("Error actualizando periodos" + error);
            });
        };
        this.Activate = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "STAGE", "D");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const id = +req.params.id;
            if (id == undefined) {
                return res.status(400).json("el id es requerido");
            }
            new domain_1.ActivateAcademicTermUseCase(this.repository)
                .execute(id)
                .then((academic) => {
                return res.status(200).json(academic);
            })
                .catch((error) => {
                return res.status(400).json("Error activando el periodo" + error);
            });
        };
        this.Deactivate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "STAGE", "D");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const id = +req.params.id;
            console.log(id);
            if (id == undefined) {
                return res.status(400).json("el id es requerido");
            }
            console.time("calculating enrollment");
            yield new domain_1.UpdateEnrollmentStatusByFinalScore(this.enrollmentRepository)
                .execute()
                .catch((error) => res.status(200).json(error));
            console.timeLog("calculating enrollment");
            yield new domain_1.UpdateStageIfApproved(this.enrollmentRepository)
                .execute()
                .catch((error) => res.status(200).json(error));
            console.log("start end academic term");
            yield new domain_1.EndAcademicTermUseCase(this.repository)
                .execute(id)
                .then((academic) => {
                return res.status(200).json(academic);
            })
                .catch((error) => {
                return res.status(400).json("Error eliminando periodo" + error);
            });
            console.timeEnd("calculating enrollment");
        });
    }
}
exports.AcademicTermController = AcademicTermController;
