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
exports.InstructorDataSourceImple = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class InstructorDataSourceImple {
    Ficha(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield postgres_1.prisma.instructor.findFirst({
                where: {
                    professor_id: id,
                },
                include: {
                    professor: {
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
                                    parish: {
                                        include: {
                                            diocese: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (person == null)
                throw new Error("Instructor does not exists");
            const cellpones = person.professor.user.person.phone_number.map((cellphone) => {
                return cellphone.phone_number;
            });
            const redes = person.professor.user.person.social_media.map((socialdata) => {
                return new domain_1.SocialMediaDTO(socialdata.social_media_category_social_media_social_media_categoryTosocial_media_category.description, socialdata.link);
            });
            let instruction_Grade = "PROFESOR";
            if (person.professor.user.academic_degree.length > 0) {
                instruction_Grade = person.professor.user.academic_degree[0].description;
            }
            const dto = new domain_1.instructorFichaDTO(person.professor_id, person.professor.user.person.profile_picture_path, person.professor.user.person.forename, person.professor.user.person.surname, person.professor.user.person.birthdate, person.starting_date, person.instructor_position, person.professor.user.parish.name, person.professor.user.parish.diocese.name, cellpones, redes, instruction_Grade);
            return dto;
        });
    }
    create(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const createInstructor = yield postgres_1.prisma.instructor.create({
                data: {
                    professor_id: createDto.professor_id,
                    status: createDto.status,
                    starting_date: createDto.starting_date,
                    instructor_position: createDto.instructor_position,
                },
            });
            yield postgres_1.prisma.user.update({
                where: { person_id: createDto.professor_id },
                data: {
                    Role_id: createDto.instructor_role,
                },
            });
            return domain_1.InstructorEntity.fromObject(createInstructor);
        });
    }
    updateById(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(updateDto);
            yield this.findById(updateDto.professor_id);
            const updateInstructor = yield postgres_1.prisma.instructor.update({
                where: { professor_id: updateDto.professor_id },
                data: {
                    starting_date: updateDto.starting_date,
                    instructor_position: updateDto.instructor_position,
                    status: updateDto.status,
                },
            });
            return domain_1.InstructorEntity.fromObject(updateInstructor);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const getInstructors = yield postgres_1.prisma.instructor.findMany();
            return getInstructors.map((Instructors) => domain_1.InstructorEntity.fromObject(Instructors));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getInstructorById = yield postgres_1.prisma.instructor.findUnique({
                where: { professor_id: id },
            });
            if (!getInstructorById)
                throw "Instructor with ID: ${id} no found";
            return domain_1.InstructorEntity.fromObject(getInstructorById);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteInstructor = yield postgres_1.prisma.instructor.update({
                where: { professor_id: id },
                data: { status: 0, instructor_position: "DESACTIVADO" },
            });
            yield postgres_1.prisma.user.update({
                where: { person_id: id },
                data: {
                    Role_id: 4,
                },
            });
            return domain_1.InstructorEntity.fromObject(deleteInstructor);
        });
    }
}
exports.InstructorDataSourceImple = InstructorDataSourceImple;
