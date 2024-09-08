"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestScoreController = void 0;
const domain_1 = require("../../domain");
const permissionValidator_1 = require("../services/permissionValidator");
class TestScoreController {
    constructor(repository) {
        this.repository = repository;
        this.get = (req, res) => {
            console.log("general get");
            const [error, getDto] = domain_1.GetTestScoreDto.get(req.query);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetTestScore(this.repository)
                .execute(getDto)
                .then((testScore) => res.set({ "Access-Control-Expose-Headers": "auth" }).json(testScore))
                .catch((error) => res.status(400).json({ error }));
        };
        this.create = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "TEST", "C");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const [error, createDto] = domain_1.CreateTestScoreDto.create(req.body);
            if (error)
                return res.status(400).json({ msj: "Data validation errors", error });
            new domain_1.CreateTestScore(this.repository)
                .execute(createDto)
                .then((testScore) => res
                .set({ "Access-Control-Expose-Headers": "auth" })
                .json({ msj: "Test Score creation successful", testScore }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.update = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "TEST", "U");
            }
            catch (error) {
                return res.status(401).json("Not allowed" + error);
            }
            const [error, updateDto] = domain_1.UpdateTestScoreDto.update(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateTestScore(this.repository)
                .execute(updateDto)
                .then((test) => res.set({ "Access-Control-Expose-Headers": "auth" }).json({
                msj: "Test score updated!",
                test,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.TestScoreController = TestScoreController;
