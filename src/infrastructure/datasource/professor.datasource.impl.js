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
const filterEnum_1 = require("../../presentation/utils/filterEnum");
const parseData_1 = require("../../presentation/utils/parseData");
class ProfessorDataSourceImpl {
    Ficha(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.professor.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user: {
                        include: {
                            academic_degree: true,
                            person: {
                                include: {
                                    phone_number: true,
                                    social_media: {
                                        include: {
                                            social_media_category_social_media_social_media_categoryTosocial_media_category: true,
                                        },
                                    },
                                },
                            },
                            parish: { include: { diocese: true } },
                        },
                    },
                },
            });
            if (result == null)
                throw new Error("Instructor does not exists");
            const cellpones = result.user.person.phone_number.map((cellphone) => {
                return cellphone.phone_number;
            });
            const redes = result.user.person.social_media.map((socialdata) => {
                return new domain_1.SocialMediaDTO(socialdata.social_media_category_social_media_social_media_categoryTosocial_media_category.description, socialdata.link);
            });
            let instruction_Grade = "PROFESOR";
            if (result.user.academic_degree.length > 0) {
                instruction_Grade = result.user.academic_degree[0].description;
            }
            const dto = new domain_1.ProfesorFichaDTO(result.id, result.user.person.profile_picture_path, result.user.person.forename, result.user.person.surname, result.user.person.birthdate, result.user.parish.name, result.user.parish.diocese.name, cellpones, redes, instruction_Grade);
            return dto;
        });
    }
    update(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorExist = yield postgres_1.prisma.professor.findUnique({
                where: { id: dto.person.id },
            });
            if (professorExist == null)
                throw "Professor doesn't exist!";
            if (dto.instructor_position) {
                const getInstructorById = yield postgres_1.prisma.instructor.findUnique({
                    where: { professor_id: dto.person.id },
                });
                if (!getInstructorById)
                    throw `instructor with ID: ${dto.instructor_position} no found`;
                const instructorPositions = yield postgres_1.prisma.instructor.findMany({
                    where: {
                        NOT: { instructor_position: "DESACTIVADO" },
                    },
                    select: { instructor_position: true },
                });
                const filteredInstructorPosition = filterEnum_1.FilterEnum.filterInstructorPosition(instructorPositions);
                console.log({ msj: "inside update", filteredInstructorPosition });
                if (dto.instructor_position) {
                    if (!(dto.instructor_position == getInstructorById.instructor_position)) {
                        if (!Object.keys(filteredInstructorPosition).includes(dto.instructor_position)) {
                            throw "there is other instructor with the same position";
                        }
                    }
                }
            }
            yield (0, user_functions_1.UpdatePersonFunc)(dto.person);
            yield (0, user_functions_1.UpdateUserFunc)(dto.user);
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
            if (createDto.instructor_position) {
                const checkInstructorPosition = yield postgres_1.prisma.instructor.findMany({
                    where: {
                        instructor_position: createDto.instructor_position,
                        NOT: {
                            OR: [
                                { instructor_position: "ASESOR_PROPEDEUTICO" },
                                { instructor_position: "DIRECTOR_ESPIRITUAL" },
                            ],
                        },
                    },
                });
                if (checkInstructorPosition.length > 0)
                    throw `there is already one instructor in the position: ${createDto.instructor_position}`;
            }
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
        });
    }
}
exports.ProfessorDataSourceImpl = ProfessorDataSourceImpl;
