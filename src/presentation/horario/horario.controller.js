"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioController = void 0;
const domain_1 = require("../../domain");
class HorarioController {
    constructor(horariorepository) {
        this.horariorepository = horariorepository;
        this.Get = (req, res) => {
            console.log(req.query);
            let id = req.query.id;
            if (id != undefined)
                id = +id;
            console.log(id);
            new domain_1.HorarioGetUseCase(this.horariorepository)
                .execute(id)
                .then((horarios) => res.json(horarios))
                .catch((error) => res.status(400).json({ error }));
        };
        this.Update = (req, res) => {
            try {
                const [error, get_dto] = domain_1.UpdateHorario.CreateDTO(req.body);
                if (error != undefined) {
                    console.log("verification errors:" + error);
                    res.json({ error }).send();
                }
                console.log({ get_dto });
                new domain_1.HorarioUpdateUseCase(this.horariorepository)
                    .execute(get_dto)
                    .then((horarios) => res.json(horarios))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(418).json({ error });
            }
        };
    }
}
exports.HorarioController = HorarioController;
