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
exports.WorkerDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const user_functions_1 = require("./utils/user.functions");
class WorkerDataSourceImpl {
    GetSocial() {
        return __awaiter(this, void 0, void 0, function* () {
            const socials = yield postgres_1.prisma.social_media_category.findMany({});
            const social_cate = socials.map(sociales => {
                return domain_1.SocialMediaCategoryEntity.fromdb({
                    id: sociales.id,
                    description: sociales.description,
                    icon: sociales.icon,
                });
            });
            return social_cate;
        });
    }
    Update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const reslut_trans = yield postgres_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const exists = yield postgres_1.prisma.person.findFirst({
                    where: { id: data.persona.id }
                });
                if (exists) { }
                else {
                    throw `worker not found`;
                }
                yield (0, user_functions_1.UpdatePersonFunc)(data.persona);
                const perona_actualizar = postgres_1.prisma.basic_worker.update({
                    where: {
                        person_id: data.persona.id,
                    }, data: {
                        job_position: data.job_position
                    }
                });
                return yield this.get(data.persona.id, undefined);
            }));
            return reslut_trans[0];
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield postgres_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield postgres_1.prisma.phone_number.deleteMany({
                    where: {
                        person_id: id
                    }
                });
                yield postgres_1.prisma.social_media.deleteMany({
                    where: {
                        person_id: id
                    }
                });
                yield postgres_1.prisma.basic_worker.delete({
                    where: {
                        person_id: id
                    }
                });
                yield postgres_1.prisma.person.delete({
                    where: {
                        id: id
                    }
                });
            }));
            return ("worker deleted");
        });
    }
    create(spers) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield postgres_1.prisma.person.findFirst({ where: { id: spers.persona.id, } });
            if (user != undefined) {
                throw new Error("Someone with the same id already exits");
            }
            try {
                const result_individual = yield postgres_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const exists = yield postgres_1.prisma.person.findFirst({
                        where: { id: spers.persona.id }
                    });
                    if (exists != null) {
                        console.log(exists);
                        throw `Usuario ya está registrado`;
                    }
                    yield (0, user_functions_1.CreatePersonFunc)(spers.persona);
                    yield postgres_1.prisma.basic_worker.create({
                        data: {
                            person_id: spers.persona.id,
                            job_position: spers.job_position.toUpperCase()
                        }
                    });
                }));
            }
            catch (error) {
                yield postgres_1.prisma.phone_number.deleteMany({ where: { person_id: spers.persona.id } });
                yield postgres_1.prisma.social_media.deleteMany({ where: { person_id: spers.persona.id } });
                yield postgres_1.prisma.person.delete({ where: { id: spers.persona.id } });
                throw error;
            }
            const result_individual = yield this.get(spers.persona.id, undefined);
            return result_individual[0];
        });
    }
    get(id_re, puesto) {
        return __awaiter(this, void 0, void 0, function* () {
            const retunrFromDB = yield postgres_1.prisma.person.findMany({
                where: {
                    AND: [
                        { id: id_re },
                        {
                            basic_worker: {
                                job_position: puesto
                            }
                        },
                        { basic_worker: {
                                isNot: null,
                            } }
                    ]
                },
                include: {
                    phone_number: true,
                    social_media: {
                        include: {
                            social_media_category_social_media_social_media_categoryTosocial_media_category: true,
                        }
                    },
                    basic_worker: true,
                }
            });
            const workers = retunrFromDB.map(Worker => {
                var _a;
                const person = domain_1.PersonEntity.fromdb({
                    id: Worker.id,
                    profile_picture_path: Worker.profile_picture_path,
                    forename: Worker.forename,
                    surname: Worker.surname,
                    email: Worker.email,
                    birthdate: Worker.birthdate,
                    medical_record: Worker.medical_record,
                    BloodType: Worker.BloodType
                });
                const phones = Worker.phone_number.map(phoneatributer => {
                    return domain_1.PhoneEntity.fromdb({
                        phone_number: phoneatributer.phone_number,
                        description: phoneatributer.description
                    });
                });
                const socials = Worker.social_media.map(sociales => {
                    return domain_1.SocialMediaEntity.fromdb({
                        social_Cate: sociales.social_media_category_social_media_social_media_categoryTosocial_media_category.description,
                        link: sociales.link
                    });
                });
                person.cellpones = phones;
                person.medias = socials;
                return domain_1.WorkerEntity.fromdb(person, (_a = Worker.basic_worker) === null || _a === void 0 ? void 0 : _a.job_position);
            });
            return workers;
        });
    }
}
exports.WorkerDataSourceImpl = WorkerDataSourceImpl;
