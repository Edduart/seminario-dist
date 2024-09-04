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
exports.BitacoraDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class BitacoraDataSourceImpl {
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.bitacora.create({ data: dto });
            return null;
        });
    }
    Get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultuts = yield postgres_1.prisma.bitacora.findMany({
                where: {
                    ID: data.id,
                    User_id: data.User_id,
                    table: data.table,
                    action: data.action,
                    date: {
                        gte: data.date1,
                        lt: data.date2,
                    },
                }
            });
            const resulkt_entities = resultuts.map((actual) => {
                return domain_1.BitacoraLog.fromObject(actual);
            });
            return resulkt_entities;
        });
    }
}
exports.BitacoraDataSourceImpl = BitacoraDataSourceImpl;
