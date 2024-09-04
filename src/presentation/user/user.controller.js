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
exports.UserControler = void 0;
const domain_1 = require("../../domain");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const hash_handler_1 = require("../services/hash_handler");
const infrastructure_1 = require("../../infrastructure");
const permissionValidator_1 = require("../services/permissionValidator");
const bitacora_datasource_imple_1 = require("../../infrastructure/datasource/bitacora.datasource.imple");
const bitacora_repository_imple_1 = require("../../infrastructure/repositories/bitacora.repository.imple");
class UserControler {
    constructor(repository) {
        this.repository = repository;
        this.getByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.query;
            new domain_1.GetUsersByType(this.repository)
                .execute(String(type))
                .then((users) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(users))
                .catch((error) => res.status(400).json({ error }));
        });
        this.getById = (req, res) => {
            const id = req.params.id;
            new domain_1.GetUserbyId(this.repository)
                .execute(id)
                .then((user) => {
                res
                    .set({ "Access-Control-Expose-Headers": "auth" })
                    .json({ msj: "Usuario encontrado", user });
            })
                .catch((error) => res.status(400).json({ error }));
        };
        this.getAll = (req, res) => {
            try {
                console.log("validando");
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "USER", 'R');
                console.log("entro");
                new domain_1.GetUsers(this.repository)
                    .execute()
                    .then((users) => {
                    res.set({ "Access-Control-Expose-Headers": "auth" }).json(users);
                }).catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json({ error });
            }
        };
        this.Login = (req, res) => {
            const acces_promts = new domain_1.Login(req.body.id, req.body.password);
            new domain_1.Login_Use(this.repository)
                .execute(acces_promts)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user == undefined) {
                    res.status(403).json("Datos de acceso invalidos").send;
                }
                else {
                    const result = yield (0, hash_handler_1.compare)(acces_promts.password, user.password);
                    if (!result) {
                        res.status(403).json("Contraseña invalida").send;
                    }
                    else {
                        (0, infrastructure_1.ActualizarFecha)(user.person_id);
                        const user_to_send = new domain_1.UserTrans(user.person_id, user.role.premissions, user.fecha, user.role.name);
                        const token = jsonwebtoken_1.default.sign(Object.assign({}, user_to_send), process.env.SECRET, { expiresIn: "30m" });
                        const datasource = new bitacora_datasource_imple_1.BitacoraDataSourceImpl();
                        const Repository = new bitacora_repository_imple_1.BitacoraRepositoryImpl(datasource);
                        new domain_1.CreateLog(Repository).execute(new domain_1.BitacoraLog(new Date(), user.person_id, "USER", domain_1.actions_enum.LOGIN));
                        res
                            .header("auth", token)
                            .set({ "Access-Control-Expose-Headers": "auth" })
                            .json(user_to_send).send;
                    }
                }
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.Reset = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const source = req.headers['Permissions'];
            const user = req.headers['User'];
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(source, "USER", 'U');
                new domain_1.Restart_use(this.repository)
                    .execute(req.body.id)
                    .then((result) => {
                    const datasource = new bitacora_datasource_imple_1.BitacoraDataSourceImpl();
                    const Repository = new bitacora_repository_imple_1.BitacoraRepositoryImpl(datasource);
                    new domain_1.CreateLog(Repository).execute(new domain_1.BitacoraLog(new Date(), user, "USER", domain_1.actions_enum.UPDATE));
                    res
                        .json("Contraseña cambiada").send;
                })
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                console.log("unexpected error while executing");
                res.status(418).send("Error: " + error);
            }
        });
        this.ChangePass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const new_pass = (0, hash_handler_1.encode)(req.body.password);
            const acces_promts = new domain_1.Login(req.body.id, yield new_pass);
            new domain_1.Change_use(this.repository)
                .execute(acces_promts)
                .then((result) => {
                res
                    .set({ "Access-Control-Expose-Headers": "auth" })
                    .json("Contraseña cambiada").send;
            })
                .catch((error) => res.status(400).json({ error }));
        });
    }
}
exports.UserControler = UserControler;
