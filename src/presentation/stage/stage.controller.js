"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageController = void 0;
const domain_1 = require("../../domain");
class StageController {
    constructor(stageRepository) {
        this.stageRepository = stageRepository;
        this.getStages = (req, res) => {
            new domain_1.GetStages(this.stageRepository)
                .execute()
                .then((stages) => res.json(stages))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getStageById = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetStage(this.stageRepository)
                .execute(id)
                .then((stage) => res.json({
                mjs: "Etapa ID:" + stage.id + ", encontrado exitosamente!",
                stage,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.StageController = StageController;
