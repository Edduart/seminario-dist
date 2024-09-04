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
exports.StageDataSourceImple = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class StageDataSourceImple {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const getStages = yield postgres_1.prisma.stage.findMany();
            return getStages.map((stages) => domain_1.StageEntity.fromObject(stages));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getStageById = yield postgres_1.prisma.stage.findUnique({
                where: { id: id }
            });
            if (!getStageById)
                throw "Stage with ID: ${id} no found";
            return domain_1.StageEntity.fromObject(getStageById);
        });
    }
}
exports.StageDataSourceImple = StageDataSourceImple;
