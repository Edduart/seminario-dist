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
exports.SeminarianDataSourceImpl = void 0;
const client_1 = require("@prisma/client");
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const user_functions_1 = require("./utils/user.functions");
class SeminarianDataSourceImpl {
    Ficha(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.seminarian.findFirst({ where: { id: id }, include: {
                    foreigner_seminarian: true,
                    user: {
                        include: {
                            academic_degree: true,
                            parish: {
                                include: {
                                    diocese: true
                                }
                            },
                            person: {
                                include: {
                                    phone_number: true,
                                    social_media: {
                                        include: {
                                            social_media_category_social_media_social_media_categoryTosocial_media_category: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                } });
            if (result == null)
                throw new Error("Seminarian does not exist");
            const [stage, course] = yield this.CheckStageAndCourse(id);
            let instruction_Grade = "BACHILLER";
            if (result.user.academic_degree.length > 0) {
                instruction_Grade = result.user.academic_degree[0].description;
            }
            const cellpones = result.user.person.phone_number.map((cellphone) => {
                return cellphone.phone_number;
            });
            const redes = result.user.person.social_media.map((socialdata) => {
                return new domain_1.SocialMediaDTO(socialdata.social_media_category_social_media_social_media_categoryTosocial_media_category.description, socialdata.link);
            });
            const stage_fixed = stage.split(" ");
            const dto = new domain_1.SeminarianFichaDTO(result.id, result.user.person.profile_picture_path, result.user.person.forename, result.user.person.surname, result.user.person.birthdate, stage_fixed[stage_fixed.length - 1], course, result.user.parish.name, result.user.parish.diocese.name, cellpones, redes, result.Location, instruction_Grade, result.Ministery == client_1.seminarian_Ministery.UNKOWN ? "N/A" : result.Ministery);
            return dto;
        });
    }
    CheckStageAndCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let etapa = "PROPEDEUTICO";
            let curso = "PROPEDÉUTICO";
            const materias = yield postgres_1.prisma.enrollment.findMany({
                where: {
                    seminarian_id: id,
                    status: "CURSANDO"
                },
                include: { subject: { include: { course: { include: { stage: true } } } } }
            });
            if (materias.length > 0) {
                etapa = materias[0].subject.course.stage.description;
                curso = materias[0].subject.course.description;
                return [etapa, curso];
            }
            const m_vacaciones = yield postgres_1.prisma.enrollment.findMany({
                where: {
                    seminarian_id: id,
                    status: "APROBADO"
                }, include: {
                    subject: {
                        include: {
                            course: {
                                include: {
                                    stage: true
                                }
                            }
                        },
                    }
                }, orderBy: {
                    subject: {
                        course: {
                            stage_id: 'desc'
                        }
                    }
                }
            });
            if (m_vacaciones.length == 0) {
                return [etapa, curso];
            }
            const materias_de_la_etapa = yield postgres_1.prisma.subject.count({
                where: {
                    status: true,
                    course: {
                        stage_id: m_vacaciones[0].subject.course.stage.id
                    }
                }
            });
            const materias_aprobadas_seminarista = yield postgres_1.prisma.enrollment.count({
                where: {
                    seminarian_id: id,
                    status: "APROBADO",
                    subject: {
                        course: {
                            stage_id: m_vacaciones[0].subject.course.stage.id
                        }
                    }
                }
            });
            if (materias_de_la_etapa == materias_aprobadas_seminarista) {
                if (m_vacaciones[0].subject.course.stage.id == 3) {
                    etapa = m_vacaciones[0].subject.course.stage.description;
                    curso = m_vacaciones[0].subject.course.description;
                    return [etapa, curso];
                }
                else {
                    const name_stage_auxiliary = yield postgres_1.prisma.stage.findFirst({
                        where: { id: m_vacaciones[0].subject.course.stage.id + 1 }
                    });
                    etapa = name_stage_auxiliary.description;
                    curso = m_vacaciones[0].subject.course.description;
                    return [etapa, curso];
                }
            }
            else {
                etapa = m_vacaciones[0].subject.course.stage.description;
                curso = m_vacaciones[0].subject.course.description;
                return [etapa, curso];
            }
        });
    }
    getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            const result = yield postgres_1.prisma.seminarian.findFirst({ where: {
                    status: client_1.seminarian_status.ACTIVO,
                    user: { person_id: id },
                }, include: {
                    user: { include: { person: true } },
                    enrollment: { include: {
                            academic_term: true
                        } }
                } });
            let stage = "";
            switch (result === null || result === void 0 ? void 0 : result.stage) {
                case 1:
                    stage = "Propedéutico";
                    break;
                case 2:
                    stage = "Discipulado";
                    break;
                case 3:
                    stage = "Configurativa";
                    break;
            }
            const year = result === null || result === void 0 ? void 0 : result.enrollment[result.enrollment.length - 1].academic_term.end_date.getFullYear().toString();
            console.log("Before break:" + result);
            if (result == null)
                throw new Error("Seminarian does not exists");
            const document = domain_1.DocumenDTO.fromdb({ id: result.user.person.id, forename: result.user.person.forename, surname: result.user.person.surname });
            document.stage = stage;
            document.period = result.enrollment[result.enrollment.length - 1].academic_term.start_date.getFullYear().toString() + " - " + result.enrollment[0].academic_term.end_date.getFullYear().toString();
            return document;
        });
    }
    getByIDCulminado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.seminarian.findFirst({ where: {
                    status: client_1.seminarian_status.CULMINADO,
                    user: { person_id: id }
                }, include: { user: { include: { person: true } } } });
            if (result == null)
                throw new Error("Seminarian does not exists");
            return domain_1.DocumenDTO.fromdb({ id: result.user.person.id, forename: result.user.person.forename, surname: result.user.person.surname });
        });
    }
    get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let where_clause_foreing = undefined;
            if (data.foreing != undefined) {
                where_clause_foreing = data.foreing ? { isNot: null } : { is: null };
            }
            console.log(data);
            const result = yield postgres_1.prisma.person.findMany({
                where: {
                    id: {
                        contains: data.id,
                    },
                    surname: {
                        contains: data.surname,
                    },
                    forename: {
                        contains: data.forename,
                    },
                    birthdate: {
                        gte: data.first_Date,
                        lte: data.second_Date,
                    },
                    user: {
                        parish_id: data.parish_id,
                        Role_id: 5,
                        parish: {
                            diocese_id: data.diocese_id,
                        },
                        seminarian: {
                            status: data.status,
                            Location: data.location,
                            Ministery: data.ministery,
                            foreigner_seminarian: where_clause_foreing,
                        },
                    },
                },
                include: {
                    phone_number: true,
                    social_media: true,
                    user: {
                        include: {
                            academic_degree: true,
                            parish: {
                                include: {
                                    diocese: true,
                                }
                            },
                            seminarian: {
                                include: {
                                    enrollment: {
                                        include: {
                                            subject: {
                                                include: {
                                                    course: true
                                                }
                                            }
                                        }
                                    },
                                    foreigner_seminarian: true,
                                },
                            },
                        },
                    },
                },
            });
            const results = result.map((person_actual) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
                const person = domain_1.PersonEntity.fromdb({
                    id: person_actual.id,
                    profile_picture_path: person_actual.profile_picture_path,
                    forename: person_actual.forename,
                    surname: person_actual.surname,
                    email: person_actual.email,
                    birthdate: person_actual.birthdate,
                    medical_record: person_actual.medical_record,
                    BloodType: person_actual.BloodType
                });
                const cellphones = person_actual.phone_number.map((cellphone_actual) => {
                    return domain_1.PhoneEntity.fromdb({
                        phone_number: cellphone_actual.phone_number,
                        description: cellphone_actual.description,
                    });
                });
                const media = person_actual.social_media.map((social_Actual) => {
                    return domain_1.SocialMediaEntity.fromdb({
                        social_media_category: social_Actual.social_media_category,
                        category: social_Actual.social_media_category,
                        link: social_Actual.link,
                    });
                });
                person.cellpones = cellphones;
                person.medias = media;
                let foreing = undefined;
                if (((_b = (_a = person_actual.user) === null || _a === void 0 ? void 0 : _a.seminarian) === null || _b === void 0 ? void 0 : _b.foreigner_seminarian) != null) {
                    foreing = domain_1.ForeingSeminarianEntity.fromdb({
                        seminary_name: (_d = (_c = person_actual.user) === null || _c === void 0 ? void 0 : _c.seminarian) === null || _d === void 0 ? void 0 : _d.foreigner_seminarian.seminary_name,
                        stage: (_f = (_e = person_actual.user) === null || _e === void 0 ? void 0 : _e.seminarian) === null || _f === void 0 ? void 0 : _f.foreigner_seminarian.stage,
                        stage_year: (_h = (_g = person_actual.user) === null || _g === void 0 ? void 0 : _g.seminarian) === null || _h === void 0 ? void 0 : _h.foreigner_seminarian.stage_year
                    });
                }
                const seminarian = domain_1.SeminarianEntity.fromdb({
                    id: (_k = (_j = person_actual.user) === null || _j === void 0 ? void 0 : _j.seminarian) === null || _k === void 0 ? void 0 : _k.id,
                    apostleships: (_m = (_l = person_actual.user) === null || _l === void 0 ? void 0 : _l.seminarian) === null || _m === void 0 ? void 0 : _m.apostleships,
                    location: (_p = (_o = person_actual.user) === null || _o === void 0 ? void 0 : _o.seminarian) === null || _p === void 0 ? void 0 : _p.Location,
                    Ministery: (_r = (_q = person_actual.user) === null || _q === void 0 ? void 0 : _q.seminarian) === null || _r === void 0 ? void 0 : _r.Ministery,
                    stage: (_t = (_s = person_actual.user) === null || _s === void 0 ? void 0 : _s.seminarian) === null || _t === void 0 ? void 0 : _t.stage.toString(),
                    status: (_v = (_u = person_actual.user) === null || _u === void 0 ? void 0 : _u.seminarian) === null || _v === void 0 ? void 0 : _v.status,
                    parish_id: (_w = person_actual.user) === null || _w === void 0 ? void 0 : _w.parish_id,
                    diocesi_id: (_x = person_actual.user) === null || _x === void 0 ? void 0 : _x.parish.diocese_id
                });
                seminarian.person = person;
                seminarian.foreing_Data = foreing;
                seminarian.diocesi_name = (_y = person_actual.user) === null || _y === void 0 ? void 0 : _y.parish.diocese.name;
                if (((_z = person_actual.user) === null || _z === void 0 ? void 0 : _z.academic_degree) != null) {
                    const degrees = person_actual.user.academic_degree.map((degree_actual) => {
                        return domain_1.DegreeEntity.fromdb(degree_actual);
                    });
                    seminarian.degrees = degrees;
                }
                return seminarian;
            });
            return results;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check_exist = yield postgres_1.prisma.seminarian.findFirst({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                },
            });
            if (check_exist == null)
                throw new Error("seminarian does not exists");
            const path = yield postgres_1.prisma.person.findFirst({
                where: {
                    id: id,
                },
                select: {
                    profile_picture_path: true,
                },
            });
            try {
                const result_u = yield postgres_1.prisma.user.update({
                    where: {
                        person_id: id,
                    },
                    data: {
                        status: false,
                    },
                });
                const result_s = yield postgres_1.prisma.seminarian.update({
                    where: {
                        id: id,
                    },
                    data: {
                        status: client_1.seminarian_status.RETIRADO,
                    },
                });
                return path === null || path === void 0 ? void 0 : path.profile_picture_path;
            }
            catch (error) {
                throw new Error("Unable to delete seminarian" + error);
            }
        });
    }
    Update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const check_exist = yield postgres_1.prisma.seminarian.findFirst({ where: { id: data.person.id, }, select: { id: true, }, });
            if (check_exist == null)
                throw new Error("seminarian does not exists");
            try {
                yield (0, user_functions_1.UpdatePersonFunc)(data.person);
                try {
                    yield postgres_1.prisma.foreigner_seminarian.delete({
                        where: { id: data.person.id },
                    });
                }
                catch (error) { }
                if (data.foreing_Data != undefined) {
                    yield postgres_1.prisma.foreigner_seminarian.create({
                        data: {
                            id: data.person.id,
                            seminary_name: data.foreing_Data.seminary_name,
                            stage: data.foreing_Data
                                .stage,
                            stage_year: data.foreing_Data.stage_year,
                        },
                    });
                }
                const result = yield postgres_1.prisma.seminarian.update({
                    where: {
                        id: data.person.id,
                    },
                    data: {
                        apostleships: data.apostleships,
                        Location: data.location,
                        Ministery: data.ministery,
                        status: data.status,
                        stage: data.stage_num
                    },
                });
                return result.id;
            }
            catch (error) {
                throw new Error("Unable to update seminarian" + error);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield postgres_1.prisma.person.findFirst({ where: { id: data.user.person.id, } });
            if (user != undefined) {
                throw new Error("Someone with the same id already exits");
            }
            try {
                const result = yield postgres_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, user_functions_1.CreateUser)(data.user);
                    if (data.foreing_Data != undefined) {
                        const result = yield postgres_1.prisma.seminarian.create({
                            data: {
                                stage: data.stage_num,
                                id: data.user.person.id,
                                apostleships: data.apostleships,
                                status: client_1.seminarian_status.ACTIVO,
                                Location: data.location,
                                Ministery: data.ministery,
                                foreigner_seminarian: {
                                    connectOrCreate: {
                                        where: {
                                            id: data.user.person.id,
                                        },
                                        create: {
                                            seminary_name: data.foreing_Data.seminary_name,
                                            stage: data.foreing_Data.stage,
                                            stage_year: data.foreing_Data.stage_year,
                                        },
                                    },
                                },
                            },
                            include: {
                                foreigner_seminarian: true,
                            },
                        });
                        return result.id;
                    }
                    const result = yield postgres_1.prisma.seminarian.create({
                        data: {
                            id: data.user.person.id,
                            apostleships: data.apostleships,
                            status: client_1.seminarian_status.ACTIVO,
                            Location: data.location,
                            Ministery: data.ministery,
                            stage: data.stage_num
                        },
                    });
                    return result.id;
                }));
                return result;
            }
            catch (error) {
                console.log(error);
                yield postgres_1.prisma.phone_number.deleteMany({ where: { person_id: data.user.person.id } });
                yield postgres_1.prisma.social_media.deleteMany({ where: { person_id: data.user.person.id } });
                yield postgres_1.prisma.academic_degree.deleteMany({ where: { user_id: data.user.person.id } });
                yield postgres_1.prisma.user.deleteMany({ where: { person_id: data.user.person.id } });
                yield postgres_1.prisma.person.delete({ where: { id: data.user.person.id } });
                throw new Error("Unable to create seminarian" + error);
            }
        });
    }
}
exports.SeminarianDataSourceImpl = SeminarianDataSourceImpl;
