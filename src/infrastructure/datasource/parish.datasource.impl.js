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
exports.ParishDatasourceimpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class ParishDatasourceimpl {
    getByDioceseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const parishes = yield postgres_1.prisma.parish.findMany({
                where: { diocese_id: id },
            });
            if (parishes.length == 0)
                throw "No parishes found with the given ID found";
            return parishes.map((parishes) => domain_1.ParishEntity.fromObject(parishes));
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const parishes = yield postgres_1.prisma.parish.findMany();
            return parishes.map((parishes) => domain_1.ParishEntity.fromObject(parishes));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const parish = yield postgres_1.prisma.parish.findUnique({
                where: {
                    id: id,
                },
            });
            if (!parish)
                throw `Parish with id ${id} not found`;
            return domain_1.ParishEntity.fromObject(parish);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const parishByname = yield postgres_1.prisma.parish.findMany({
                where: {
                    name: { contains: name },
                },
            });
            return parishByname.map((parish) => domain_1.ParishEntity.fromObject(parish));
        });
    }
    updateById(updateParishDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findById(updateParishDto.id);
            const updateParish = yield postgres_1.prisma.parish.update({
                where: { id: updateParishDto.id },
                data: updateParishDto.values,
            });
            return domain_1.ParishEntity.fromObject(updateParish);
        });
    }
    create(created) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchDiocese = yield postgres_1.prisma.diocese.findMany({
                where: { id: created.diocese_id },
            });
            if (searchDiocese.length == 0)
                throw "No diocesis found";
            const result = yield postgres_1.prisma.parish.create({
                data: {
                    name: created.name,
                    patron: created.patron,
                    diocese_id: searchDiocese[0].id,
                },
            });
            const result_i = this.findById(result.id);
            return result_i;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_with_parish = yield postgres_1.prisma.user.findMany({ where: { parish_id: id } });
            if (user_with_parish.length > 0)
                throw `Unable to delete this record, there are user with this parish`;
            yield postgres_1.prisma.parish.delete({ where: { id: id, }, });
            return null;
        });
    }
}
exports.ParishDatasourceimpl = ParishDatasourceimpl;
