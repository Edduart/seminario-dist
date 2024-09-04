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
exports.ProfessorDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const user_functions_1 = require("./utils/user.functions");
const parseData_1 = require("../../presentation/utils/parseData");
class ProfessorDataSourceImpl {
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorExist = yield postgres_1.prisma.professor.findUnique({
                where: { id: data.person.id },
            });
            if (professorExist == null)
                throw "Professor doesn't exist!";
            yield (0, user_functions_1.UpdatePersonFunc)(data.person);
            yield (0, user_functions_1.UpdateUserFunc)(data.user);
            return { msj: "Professor Updated!" };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorExist = yield postgres_1.prisma.professor.findUnique({
                where: { id: id },
            });
            if (professorExist == null)
                throw "Professor doesn't exist!!";
            const userExist = yield postgres_1.prisma.user.findUnique({
                where: { person_id: id },
            });
            if (userExist == null)
                throw "User doesn't exist!";
            yield postgres_1.prisma.user.update({
                where: { person_id: id },
                data: { status: false },
            });
            yield postgres_1.prisma.professor.update({
                where: { id: id },
                data: { status_id: 0 },
            });
            const isInstructor = yield postgres_1.prisma.instructor.findUnique({
                where: { professor_id: id },
            });
            if (isInstructor != null) {
                yield postgres_1.prisma.instructor.update({
                    where: { professor_id: id },
                    data: { status: 0, instructor_position: "DESACTIVADO" },
                });
            }
            return { success: true, msj: "Profesor desactivado" };
        });
    }
    create(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield postgres_1.prisma.user.findUnique({
                where: { person_id: createDto.user.person.id },
            });
            if (exists)
                throw "Person already exist";
            yield (0, user_functions_1.CreateUser)(createDto.user);
            yield postgres_1.prisma.professor.create({
                data: {
                    id: createDto.user.person.id,
                    status_id: 1,
                },
            });
            const dtoForResponse = new domain_1.GetProfessorDto(createDto.user.person.id);
            const resultIndividual = yield this.get(dtoForResponse);
            return resultIndividual[0];
        });
    }
    get(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnFromDB = yield postgres_1.prisma.professor.findMany({
                where: { id: filter.id, status_id: filter.status },
                select: {
                    id: true,
                    status_id: true,
                    instructor: true,
                    user: {
                        include: {
                            academic_degree: true,
                            parish: { select: { id: true, diocese_id: true } },
                            person: {
                                include: {
                                    user: true,
                                    phone_number: true,
                                    social_media: {
                                        include: {
                                            social_media_category_social_media_social_media_categoryTosocial_media_category: {
                                                select: {
                                                    social_media_social_media_social_media_categoryTosocial_media_category: { select: { id: true } },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (returnFromDB.length === 0)
                throw "No se encontraron coincidencias con los parametros especificados!";
            console.log(returnFromDB);
            return (0, parseData_1.parseProfessorGet)(returnFromDB);
            ;
        });
    }
}
exports.ProfessorDataSourceImpl = ProfessorDataSourceImpl;
