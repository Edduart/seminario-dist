"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DioceseController = void 0;
const domain_1 = require("../../domain");
class DioceseController {
    constructor(dioceseRepository) {
        this.dioceseRepository = dioceseRepository;
        this.getDioceses = (req, res) => {
            new domain_1.GetDioceses(this.dioceseRepository)
                .execute()
                .then((dioceses) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(dioceses))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getDioceseById = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetDiocese(this.dioceseRepository)
                .execute(id)
                .then((diocese) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                mjs: "Diosesis ID:" + diocese.id + ", encontrada exitosamente!",
                diocese,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getDioceseByName = (req, res) => {
            const name = req.params.name.toUpperCase();
            new domain_1.GetDioceseByName(this.dioceseRepository)
                .execute(name)
                .then((diocese) => {
                if (diocese.length == 0) {
                    res.json({
                        msj: "No se encontro ninguna conincidencia con: " + name,
                    });
                }
                else {
                    res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                        msj: "coincidencias con la palabra: " + name,
                        diocese,
                    });
                }
            })
                .catch((error) => res.status(400).json({ error }));
        };
        this.updateDioceseById = (req, res) => {
            const id = +req.params.id;
            const [error, updateDioceseDto] = domain_1.UpdateDioceseDto.update(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateDiocese(this.dioceseRepository)
                .execute(updateDioceseDto)
                .then((diocese) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                msj: "Diocese ID:" + diocese.id + ", actualizada correctamente!",
                diocese,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.createDiocese = (req, res) => {
            const [error, createDioceseDto] = domain_1.CreateDioceseDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateDiocese(this.dioceseRepository)
                .execute(createDioceseDto)
                .then((diocese) => res
                .set({ "Access-Control-Expose-Headers": "auth" })
                .json({ msj: "Diocese creada exitosamente", diocese }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.deleteDiocese = (req, res) => {
            const id = +req.params.id;
            new domain_1.DeleteDiocese(this.dioceseRepository)
                .execute(id)
                .then((diocese) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                msj: "Diocesis " + diocese.name + " eliminada exitosamente!",
                diocese,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.DioceseController = DioceseController;
