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
exports.DioceseDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class DioceseDataSourceImpl {
    create(createDioceseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.getByName(createDioceseDto.name);
            const dioceseExist = check.find((item) => item.name === createDioceseDto.name);
            if (dioceseExist)
                throw `Diocese with name: ${createDioceseDto.name}, already exist`;
            const createDiocese = yield postgres_1.prisma.diocese.create({
                data: createDioceseDto,
            });
            return domain_1.DioceseEntity.fromObject(createDiocese);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const dioceses = yield postgres_1.prisma.diocese.findMany();
            return dioceses.map((diocese) => domain_1.DioceseEntity.fromObject(diocese));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const diocese = yield postgres_1.prisma.diocese.findUnique({
                where: {
                    id: id,
                },
            });
            if (!diocese)
                throw `Diocese with id ${id} not found`;
            return domain_1.DioceseEntity.fromObject(diocese);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const dioceseByName = yield postgres_1.prisma.diocese.findMany({
                where: {
                    name: { contains: name },
                },
            });
            return dioceseByName.map((diocese) => domain_1.DioceseEntity.fromObject(diocese));
        });
    }
    updateById(updateDioceseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findById(updateDioceseDto.id);
            const result = yield postgres_1.prisma.diocese.findFirst({
                where: { name: updateDioceseDto.name, id: { not: updateDioceseDto.id } },
            });
            if (result != null) {
                throw "diocese with same name already exists";
            }
            const updateDiocese = yield postgres_1.prisma.diocese.update({
                where: { id: updateDioceseDto.id },
                data: updateDioceseDto.values,
            });
            return domain_1.DioceseEntity.fromObject(updateDiocese);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkIfHaveParish = yield postgres_1.prisma.parish.findMany({
                where: { diocese_id: id },
            });
            if (checkIfHaveParish.length > 0)
                throw `Unable to delete this record, there are parishes with this diocese`;
            yield this.findById(id);
            const deleteDiocese = yield postgres_1.prisma.diocese.delete({
                where: { id: id },
            });
            return domain_1.DioceseEntity.fromObject(deleteDiocese);
        });
    }
}
exports.DioceseDataSourceImpl = DioceseDataSourceImpl;
