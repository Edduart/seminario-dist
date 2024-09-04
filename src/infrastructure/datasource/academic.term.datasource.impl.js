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
exports.AcademicTermDataSourceImpl = void 0;
const client_1 = require("@prisma/client");
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class AcademicTermDataSourceImpl {
    GetByID(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield postgres_1.prisma.academic_term.findFirst({
                where: { id: data.id,
                    status: {
                        not: client_1.academic_term_status.EQUIVALENCIAS
                    }
                }
            });
            if (results == null)
                throw new Error("ID Does not exists");
            const entity = domain_1.AcademicTermEntityt.fromObject(results);
            return entity;
        });
    }
    EndAcademicTerm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield postgres_1.prisma.academic_term.findFirst({ where: { id: id } });
            console.log(find);
            if (find == null)
                throw new Error("El periodo academico no existe");
            const result = yield postgres_1.prisma.academic_term.update({
                where: { id: id },
                data: {
                    status: client_1.academic_term_status.CULMINADO
                }
            });
            return domain_1.AcademicTermEntityt.fromObject(result);
        });
    }
    ActivateAcademicTerm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield postgres_1.prisma.academic_term.findFirst({ where: { id: id } });
            if (find == null)
                throw new Error("El periodo academico no existe");
            const result = yield postgres_1.prisma.academic_term.update({
                where: { id: id },
                data: {
                    status: client_1.academic_term_status.ACTIVO
                }
            });
            return domain_1.AcademicTermEntityt.fromObject(result);
        });
    }
    Update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield postgres_1.prisma.academic_term.findFirst({ where: { id: id } });
            if (find == null)
                throw new Error("El periodo academico no existe");
            let number = 1;
            if (find.semester == 1)
                number = 2;
            const result = yield postgres_1.prisma.academic_term.update({
                where: {
                    id: id
                }, data: {
                    semester: number
                }
            });
            return domain_1.AcademicTermEntityt.fromObject(result);
        });
    }
    Get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let whereClause = {};
            if (data.fecha != undefined) {
                const startOfYear = new Date(data.fecha.getFullYear(), 0, 1);
                const endOfYear = new Date(data.fecha.getFullYear() + 1, 0, 1);
                whereClause = {
                    OR: [
                        {
                            start_date: {
                                gte: startOfYear,
                                lt: endOfYear,
                            },
                        },
                        {
                            end_date: {
                                gte: startOfYear,
                                lt: endOfYear,
                            },
                        },
                    ],
                };
            }
            const results = yield postgres_1.prisma.academic_term.findMany({
                where: whereClause
            });
            const entities = results.map((actual) => {
                return domain_1.AcademicTermEntityt.fromObject(actual);
            });
            return entities;
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postgres_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const result = yield postgres_1.prisma.academic_term.create({
                        data: dto
                    });
                    const materias = yield postgres_1.prisma.subject.findMany({
                        where: { status: true }, select: { id: true }
                    });
                    const data = materias.map((actual) => {
                        return {
                            academic_term_id: result.id,
                            subject_id: actual.id,
                            professor_id: null
                        };
                    });
                    yield postgres_1.prisma.instruction.createMany({
                        data: data,
                    });
                    return result;
                }));
                return domain_1.AcademicTermEntityt.fromObject(result);
            }
            catch (error) {
                throw new Error("somenthin went wrong" + error);
            }
        });
    }
}
exports.AcademicTermDataSourceImpl = AcademicTermDataSourceImpl;
