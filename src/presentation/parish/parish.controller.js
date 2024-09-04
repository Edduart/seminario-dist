"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParishController = void 0;
const domain_1 = require("../../domain");
class ParishController {
    constructor(parishrepository) {
        this.parishrepository = parishrepository;
        this.getByDioceseId = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetByDiocese(this.parishrepository)
                .execute(id)
                .then((parishes) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(parishes))
                .catch((error) => res.status(400).json({ error }));
        };
        this.createParish = (req, res) => {
            const [error, createParishDto] = domain_1.CreateParishDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateParish(this.parishrepository)
                .execute(createParishDto)
                .then((parish) => res.json({ msj: "Parroquia creada exitosamente", parish }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getParishes = (req, res) => {
            new domain_1.Getparishes(this.parishrepository)
                .execute()
                .then((parishrepository) => res.json({ msj: "Lista de parroquias existentes: ", parishrepository }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.GetParishById = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetParish(this.parishrepository)
                .execute(id)
                .then((parish) => res.json({ msj: "Parroquia conseguida exitosamente", parish }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getParishByname = (req, res) => {
            const name = req.params.name.toUpperCase();
            new domain_1.GetParishByname(this.parishrepository)
                .execute(name)
                .then((parish) => {
                if (parish.length == 0) {
                    res.json({
                        msj: "No se encontro ninguna conincidencia con: " + name,
                    });
                }
                else {
                    res.json({
                        msj: "coincidencias con la palabra: " + name,
                        parish,
                    });
                }
            })
                .catch((error) => res.status(400).json({ error }));
        };
        this.UpdateParishById = (req, res) => {
            const id = +req.params.id;
            const [error, updateParishDto] = domain_1.UpdateParishDto.update(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateParish(this.parishrepository)
                .execute(updateParishDto)
                .then((parish) => res.json({
                msj: " Parroquia id:" + id + " actualizada correctamente",
                parish,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.deleteParishById = (req, res) => {
            const id = parseInt(req.params.id);
            new domain_1.DeleteParish(this.parishrepository)
                .execute(id)
                .then((parish) => res.json({
                msj: " Parroquia" + id + " eliminada correctamente",
                parish,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.ParishController = ParishController;
