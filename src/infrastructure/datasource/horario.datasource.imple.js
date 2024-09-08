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
exports.HorarioDataSourceImplementation = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class HorarioDataSourceImplementation {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            const results = yield postgres_1.prisma.horarios.findMany({
                where: {
                    ID: id,
                },
            });
            const horarios = results.map((element) => {
                return domain_1.HorarioEntity.fromObject(element);
            });
            return horarios;
        });
    }
    updateById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ data });
            const result = yield postgres_1.prisma.horarios.update({
                where: {
                    ID: data.id,
                },
                data: { link: data.link },
            });
            return domain_1.HorarioEntity.fromObject(result);
        });
    }
}
exports.HorarioDataSourceImplementation = HorarioDataSourceImplementation;
