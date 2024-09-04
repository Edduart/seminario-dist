"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorPositionController = void 0;
const domain_1 = require("../../domain");
class InstructorPositionController {
    constructor(stageRepository) {
        this.stageRepository = stageRepository;
        this.getInstructorPositions = (req, res) => {
            new domain_1.GetInstructorPositions(this.stageRepository)
                .execute()
                .then((instructorPosition) => res.json(instructorPosition))
                .catch((error) => res.status(400).json({ error }));
        };
        this.getinstructorPositionById = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetInstructorPosition(this.stageRepository)
                .execute(id)
                .then((instructorPosition) => res.json({
                mjs: "Posicion de instructor ID:" + instructorPosition.id + ", encontrado exitosamente!",
                instructorPosition,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.InstructorPositionController = InstructorPositionController;
