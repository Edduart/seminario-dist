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
exports.SubjectDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class SubjectDataSourceImpl {
    Get_fields() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield postgres_1.prisma.academic_field.findMany({
                include: {
                    stage: true,
                },
            });
            const fields = results.map((field_actual) => domain_1.academicFieldEntity.fromObject(field_actual));
            return fields;
        });
    }
    get_instruction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.subject.findMany({
                where: {
                    AND: {
                        description: {
                            contains: data.description,
                        },
                        id: data.id,
                        course_id: data.course_id,
                        academic_field: {
                            id: data.academic_field_id,
                            stage_id: data.stage_id,
                        },
                    },
                },
                include: {
                    instruction: true,
                    course: true,
                    academic_field: {
                        include: {
                            stage: true,
                        },
                    },
                    subject: {
                        include: {
                            academic_field: {
                                include: {
                                    stage: true,
                                },
                            },
                        },
                    },
                },
            });
            const results = result.map((subject) => {
                const subject_actual = domain_1.SubjectDeliver.fromObject(subject);
                subject_actual.instruction = subject.instruction.map((instructions) => {
                    return domain_1.instruction_dto.fromObject(instructions);
                });
                return subject_actual;
            });
            return results;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.subject.findFirst({
                where: { id: id },
                select: { status: true },
            });
            if (result == null)
                throw new Error("Subject does not exists");
            const result_p = yield postgres_1.prisma.subject.findMany({
                where: { precedent: id },
            });
            if (result_p.length > 0)
                throw new Error("can not delete as it precents: " + result_p[0].description);
            const auxiliary_boolean = !result.status;
            const delete_u = yield postgres_1.prisma.subject.update({
                where: { id: id },
                data: { status: auxiliary_boolean, precedent: null },
            });
            const subjet_deleted = yield this.get(domain_1.GetSubjectDTO.FindDto(delete_u.id, false));
            return subjet_deleted[0];
        });
    }
    Update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.subject.findFirst({
                where: { description: data.description, id: { not: data.id } },
            });
            if (result != null) {
                throw new Error("Subject with same name already exists");
            }
            const result_u = yield postgres_1.prisma.subject.update({
                where: {
                    id: data.id,
                },
                data: data,
            });
            const subjet_created = yield this.get(domain_1.GetSubjectDTO.FindDto(result_u.id));
            return subjet_created[0];
        });
    }
    get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.subject.findMany({
                where: {
                    AND: {
                        description: {
                            contains: data.description,
                        },
                        id: data.id,
                        course_id: data.course_id,
                        academic_field: {
                            id: data.academic_field_id,
                            stage_id: data.stage_id,
                        },
                    },
                },
                include: {
                    course: true,
                    academic_field: {
                        include: {
                            stage: true,
                        },
                    },
                    subject: {
                        include: {
                            academic_field: {
                                include: {
                                    stage: true,
                                },
                            },
                        },
                    },
                },
            });
            const results = result.map((subject) => {
                return domain_1.SubjectEntity.fromObject(subject);
            });
            return results;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result_name = yield postgres_1.prisma.subject.findFirst({
                where: { description: data.description },
            });
            if (result_name != null)
                throw new Error("Subject with same name already exists");
            if (data.precedent != null) {
                yield this.CheckPrecedent(data.precedent, data.course_id, data.semester);
            }
            const subject = yield postgres_1.prisma.subject.create({
                data: data,
            });
            const subjectEquivalence = yield postgres_1.prisma.instruction.create({
                data: {
                    subject_id: subject.id,
                    academic_term_id: 1,
                },
            });
            const subjectDescription = `EVALUACION DE EQUIVALENCIA: ${subject.description}`;
            yield postgres_1.prisma.test.create({
                data: {
                    subject_id: subjectEquivalence.subject_id,
                    academic_term_id: subjectEquivalence.academic_term_id,
                    description: subjectDescription,
                    maximum_score: 100,
                },
            });
            const subjet_created = yield this.get(domain_1.GetSubjectDTO.FindDto(subject.id));
            return subjet_created[0];
        });
    }
    CheckPrecedent(id, course, semester) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjet_pre = yield postgres_1.prisma.subject.findFirst({
                where: { id: id, status: true },
            });
            if (subjet_pre != null) {
                if (subjet_pre.course_id < course)
                    return true;
                if (subjet_pre.course_id == course) {
                    if (subjet_pre.semester < semester) {
                        return true;
                    }
                    else
                        throw new Error("La materia que prela no puede ser de un semestre mayor o igual");
                }
                else
                    throw new Error("La materia que prela no puede ser de un curso mayor");
            }
            else
                throw new Error("La materia que prela no existe o está desactivada");
        });
    }
    Pensum() {
        return __awaiter(this, void 0, void 0, function* () {
            const stages = yield postgres_1.prisma.stage.findMany({
                include: {
                    academic_field: {
                        include: {
                            subject: {
                                include: {
                                    subject: true,
                                },
                            },
                        },
                    },
                },
            });
            let subjects;
            const pensum = stages.map((stage_actual) => {
                subjects = [];
                stage_actual.academic_field.map((field_actual) => {
                    field_actual.subject.map((materia_actual) => {
                        subjects.push(new domain_1.subjectPensumDTO(materia_actual.subject != null
                            ? materia_actual.subject.description
                            : " ", materia_actual.description));
                    });
                });
                return new domain_1.Stage_PensumDTO(subjects, stage_actual.description);
            });
            return pensum;
        });
    }
}
exports.SubjectDataSourceImpl = SubjectDataSourceImpl;
