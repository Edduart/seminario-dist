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
const data_1 = require("./data/");
const postgres_1 = require("../data/postgres");
const client_1 = require("@prisma/client");
main();
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield postgres_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                data_1.Horarios.forEach((Element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.horarios.upsert({
                        where: { ID: Element.ID },
                        update: {},
                        create: Element,
                    });
                }));
                console.log("Seeding: permissions");
                data_1.permissions.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.permission.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: roles");
                data_1.roles.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.role.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: role_permissions");
                data_1.rolePermissions.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.role_permission.upsert({
                        where: {
                            role_id_permission_id: {
                                role_id: element.role_id,
                                permission_id: element.permission_id,
                            },
                        },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: diocesis");
                data_1.dioceses.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.diocese.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: parishes");
                data_1.parishes.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.parish.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: categories");
                data_1.redes.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.social_media_category.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: stages");
                data_1.stages.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.stage.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: academic fields");
                data_1.academics.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.academic_field.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                yield delay(1000);
                console.log("Seeding: courses");
                data_1.course.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.course.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: super user");
                data_1.person.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.person.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("Seeding: super person");
                data_1.user.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.user.upsert({
                        where: { person_id: element.person_id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(2000);
                console.log("Seeding: academic terms");
                yield postgres_1.prisma.academic_term.upsert({
                    where: { id: 1 },
                    update: {},
                    create: {
                        id: 1,
                        start_date: new Date(2020, 1, 1),
                        end_date: new Date(2025, 1, 1),
                        semester: 1,
                        status: client_1.academic_term_status.EQUIVALENCIAS,
                    },
                });
                yield delay(1000);
                data_1.subjectNO.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.subject.upsert({
                        where: { id: element.id },
                        update: {},
                        create: element,
                    });
                }));
                yield delay(1000);
                console.log("fixing precedents");
                data_1.subject.forEach((Element) => __awaiter(this, void 0, void 0, function* () {
                    yield postgres_1.prisma.subject.update({
                        where: { id: Element.id },
                        data: {
                            precedent: Element.precedent,
                        },
                    });
                }));
                yield delay(1000);
                for (let i = 1; i < data_1.subjectNO.length; i++) {
                    yield postgres_1.prisma.instruction.upsert({
                        where: {
                            subject_id_academic_term_id: {
                                academic_term_id: 1,
                                subject_id: i,
                            },
                        },
                        update: {},
                        create: {
                            subject_id: i,
                            academic_term_id: 1,
                        }, include: {}
                    });
                }
                yield delay(1000);
                for (let i = 1; i < data_1.subjectNO.length; i++) {
                    yield postgres_1.prisma.test.upsert({
                        where: {
                            academic_term_id_subject_id: {
                                academic_term_id: 1,
                                subject_id: i
                            }
                        }, update: {},
                        create: {
                            academic_term_id: 1,
                            subject_id: i,
                            description: "EXAMEN UNICO",
                            status: true,
                            maximum_score: 100.0
                        }
                    });
                }
                console.log("seeder completed");
            }));
        }
        catch (error) { }
    });
}
