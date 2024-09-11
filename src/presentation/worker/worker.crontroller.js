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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerControler = void 0;
const domain_1 = require("../../domain");
const fs_1 = __importDefault(require("fs"));
const permissionValidator_1 = require("../services/permissionValidator");
const parseData_1 = require("../utils/parseData");
const imageManipulation_1 = require("../../presentation/utils/imageManipulation");
const worker_ficha_1 = require("../docs/worker.ficha");
class WorkerControler {
    constructor(repository) {
        this.repository = repository;
        this.GetSocials = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "USER", "R");
                new domain_1.GetSocials(this.repository)
                    .execute()
                    .then((worker) => {
                    res.set({ "Access-Control-Expose-Headers": "auth" }).json(worker);
                })
                    .catch((error) => {
                    console.error(error);
                    res.status(400).json({ error });
                });
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        });
        this.Ficha = (req, res) => {
            const id = typeof req.params.id === "string" &&
                req.params.id.length < 20 &&
                req.params.id.length > 1
                ? req.params.id
                : undefined;
            new domain_1.GetWorker(this.repository).execute(id, undefined)
                .then((infoworker) => {
                const line = res.writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "inline; filename=ficha.pdf",
                });
                (0, worker_ficha_1.BuildFichaWorker)((data) => line.write(data), () => line.end(), infoworker);
            })
                .catch((error) => res.status(400).json({ error }));
        };
        this.get = (req, res) => {
            const id = typeof req.query.id === "string" &&
                req.query.id.length < 20 &&
                req.query.id.length > 1
                ? req.query.id
                : undefined;
            const job = typeof req.query.job === "string" &&
                req.query.job.length < 100 &&
                req.query.job.length > 1
                ? req.query.job
                : undefined;
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "USER", "R");
                new domain_1.GetWorker(this.repository)
                    .execute(id, job)
                    .then((worker) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(worker))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        };
        this.deleteRole = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "USER", "D");
                new domain_1.DeleteWorker(this.repository)
                    .execute(req.params.id)
                    .then((worker) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(worker))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        };
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const source = req.headers["Permissions"];
            try {
                console.log(source);
                const result = (0, permissionValidator_1.ValidatePermission)(source, "USER", "U");
                let origin = JSON.parse(req.body.data);
                const persondto = yield (0, parseData_1.parsePersonData)(req.body.data, req.body.ayuda);
                const workerdto = new domain_1.CreateWorker(persondto, origin.job_position);
                const result_validations = workerdto.Validate();
                if (result_validations == null) {
                    new domain_1.UpdateWorkerUseCase(this.repository)
                        .execute(workerdto)
                        .then((worker) => __awaiter(this, void 0, void 0, function* () {
                        yield (0, imageManipulation_1.imageResize)(req.body.ayuda);
                        res.json(worker).send;
                    }))
                        .catch((error) => {
                        res.status(400).send("Unexpected error: " + error);
                    });
                }
                else {
                    res.status(400).send("Validation error: " + result_validations);
                }
            }
            catch (error) {
                res.status(401).json("Acces denied");
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const source = req.headers["Permissions"];
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(source, "USER", "C");
                let origin = JSON.parse(req.body.data);
                const persondto = yield (0, parseData_1.parsePersonData)(req.body.data, req.body.ayuda);
                const workerdto = new domain_1.CreateWorker(persondto, origin.job_position);
                const result_validations = workerdto.Validate();
                if (result_validations == null) {
                    new domain_1.CreateWorkerUseCase(this.repository)
                        .execute(workerdto)
                        .then((worker) => __awaiter(this, void 0, void 0, function* () {
                        yield (0, imageManipulation_1.imageResize)(req.body.ayuda);
                        res.json(worker).send;
                    }))
                        .catch((error) => {
                        if (fs_1.default.existsSync(req.body.ayuda))
                            fs_1.default.unlinkSync(req.body.ayuda);
                        res.status(400).send("Unexpected error: " + error);
                    });
                }
                else {
                    if (fs_1.default.existsSync(req.body.ayuda))
                        fs_1.default.unlinkSync(req.body.ayuda);
                    res.status(400).send("Validation error: " + result_validations);
                }
            }
            catch (_a) {
                if (fs_1.default.existsSync(req.body.ayuda))
                    fs_1.default.unlinkSync(req.body.ayuda);
                res.status(401).json("Acces denied");
            }
        });
    }
}
exports.WorkerControler = WorkerControler;
