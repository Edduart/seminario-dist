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
exports.UpdateUserFunc = exports.CreateUser = exports.CreatePersonFunc = exports.UpdatePersonFunc = void 0;
const postgres_1 = require("../../../data/postgres");
function UpdatePersonFunc(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const check_exist = yield postgres_1.prisma.person.findFirst({
            where: {
                id: data.id,
            },
            select: {
                id: true,
            },
        });
        if (check_exist == null)
            throw new Error("person does not exists");
        try {
            yield postgres_1.prisma.phone_number.deleteMany({
                where: {
                    person_id: data.id,
                },
            });
            yield postgres_1.prisma.social_media.deleteMany({
                where: {
                    person_id: data.id,
                },
            });
            if (data.media != null) {
                const media_json = data.media.map((actual) => {
                    return {
                        person_id: data.id,
                        social_media_category: actual.social_media_category,
                        link: actual.link,
                    };
                });
                yield postgres_1.prisma.social_media.createMany({
                    data: media_json,
                });
            }
            if (data.cellphone != null) {
                const cell_json = (_a = data.cellphone) === null || _a === void 0 ? void 0 : _a.map((actual) => {
                    return {
                        person_id: data.id,
                        phone_number: actual.phone_number,
                        description: actual.phone_number,
                    };
                });
                yield postgres_1.prisma.phone_number.createMany({
                    data: cell_json,
                });
            }
            yield postgres_1.prisma.person.update({
                where: {
                    id: data.id,
                },
                data: {
                    forename: data.forename,
                    surname: data.surname,
                    birthdate: data.birthdate,
                    profile_picture_path: data.profile_picture_path,
                    email: data.email,
                    medical_record: data.medical_record,
                    BloodType: data.Blood,
                },
            });
        }
        catch (error) {
            throw new Error("Error updating person" + error);
        }
    });
}
exports.UpdatePersonFunc = UpdatePersonFunc;
function CreatePersonFunc(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const check_exist = yield postgres_1.prisma.person.findFirst({
            where: {
                id: data.id,
            },
            select: {
                id: true,
            },
        });
        if (check_exist != null)
            return;
        console.log(data);
        try {
            const result_op = yield postgres_1.prisma.person.create({
                data: {
                    id: data.id,
                    forename: data.forename,
                    surname: data.surname,
                    birthdate: data.birthdate,
                    profile_picture_path: data.profile_picture_path,
                    email: data.email,
                    medical_record: data.medical_record,
                    BloodType: data.Blood,
                },
            });
            if (data.media != null) {
                const media_json = data.media.map((actual) => {
                    return {
                        person_id: data.id,
                        social_media_category: actual.social_media_category,
                        link: actual.link,
                    };
                });
                yield postgres_1.prisma.social_media.createMany({
                    data: media_json,
                });
            }
            if (data.cellphone != null) {
                const cell_json = (_a = data.cellphone) === null || _a === void 0 ? void 0 : _a.map((actual) => {
                    return {
                        person_id: data.id,
                        phone_number: actual.phone_number,
                        description: actual.phone_number,
                    };
                });
                yield postgres_1.prisma.phone_number.createMany({
                    data: cell_json,
                });
            }
        }
        catch (error) {
            throw new Error("Error creating person" + error);
        }
    });
}
exports.CreatePersonFunc = CreatePersonFunc;
function CreateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const check_exist = yield postgres_1.prisma.user.findFirst({
            where: {
                person_id: user.person.id,
            },
            select: {
                person_id: true,
            },
        });
        if (check_exist != null)
            return;
        try {
            yield postgres_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield CreatePersonFunc(user.person);
                const result_op = yield postgres_1.prisma.user.create({
                    data: {
                        person_id: user.person.id,
                        parish_id: user.parish_id,
                        status: true,
                        Role_id: user.role,
                        password: user.password,
                        LastIn: null,
                    },
                });
                if (user.degree != undefined) {
                    const degree_json = user.degree.map((actual) => {
                        return {
                            user_id: user.person.id,
                            description: actual.description,
                            link: actual.link,
                        };
                    });
                    yield postgres_1.prisma.academic_degree.createMany({
                        data: degree_json,
                    });
                }
            }));
        }
        catch (error) {
            throw new Error("Error creating user" + error);
        }
    });
}
exports.CreateUser = CreateUser;
function UpdateUserFunc(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const check_exist = yield postgres_1.prisma.user.findFirst({
            where: {
                person_id: user.person_id,
            },
            select: {
                person_id: true,
            },
        });
        if (check_exist == null)
            throw new Error("user does not exists");
        try {
            yield postgres_1.prisma.academic_degree.deleteMany({
                where: {
                    user_id: user.person_id,
                },
            });
            if (user.degree != undefined) {
                const degree_json = user.degree.map((actual) => {
                    return {
                        user_id: user.person_id,
                        description: actual.description,
                        link: actual.link,
                    };
                });
                yield postgres_1.prisma.academic_degree.createMany({
                    data: degree_json,
                });
            }
            console.log("user in fuction", user.role_id);
            yield postgres_1.prisma.user.update({
                where: {
                    person_id: user.person_id,
                },
                data: {
                    parish_id: user.parish_id,
                    status: user.status,
                    Role_id: user.role_id,
                    password: user.password,
                },
            });
        }
        catch (error) {
            throw new Error("Error updating user" + error);
        }
    });
}
exports.UpdateUserFunc = UpdateUserFunc;
