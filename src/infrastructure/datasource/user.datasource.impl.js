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
exports.ActualizarFecha = exports.UserDataSourceImplementation = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const hashHandler_1 = require("../../presentation/services/hashHandler");
const FilterNullObject_1 = require("../../presentation/utils/FilterNullObject");
class UserDataSourceImplementation {
    RestartPassword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield (0, hashHandler_1.encode)(id);
            const actu = yield postgres_1.prisma.user.update({
                where: { person_id: id }, data: {
                    password: password,
                    LastIn: null
                }
            });
            return actu.person_id;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userById = yield postgres_1.prisma.user.findUnique({
                where: { person_id: id },
                select: {
                    person: { select: { id: true, forename: true, surname: true } },
                    seminarian: {
                        select: { status: true },
                    },
                    professor: {
                        select: {
                            status_id: true,
                            instructor: { select: { status: true, instructor_position: true } },
                        },
                    },
                },
            });
            if (userById == null)
                throw ("No se encontraron coincidencias!");
            return (0, FilterNullObject_1.filterNullValues)(userById);
        });
    }
    getByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "professor" || type === "seminarian") {
                const userByType = yield postgres_1.prisma.user.findMany({
                    where: {
                        [type]: { isNot: null },
                    },
                    select: {
                        person: { select: { id: true, forename: true, surname: true } },
                        seminarian: {
                            select: { status: true },
                        },
                        professor: {
                            select: {
                                status_id: true,
                                instructor: {
                                    select: { status: true, instructor_position: true },
                                },
                            },
                        },
                    },
                });
                return userByType.map(FilterNullObject_1.filterNullValues);
            }
            else {
                throw "Debe enviar un tipo de usuario valido!";
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield postgres_1.prisma.user.findMany({
                where: {
                    role: {
                        id: {
                            not: 1
                        }
                    }
                },
                select: {
                    person: { select: { id: true, forename: true, surname: true } },
                    seminarian: {
                        select: { status: true },
                    },
                    professor: {
                        select: {
                            status_id: true,
                            instructor: { select: { status: true, instructor_position: true } },
                        },
                    },
                },
            });
            return users.map(FilterNullObject_1.filterNullValues);
        });
    }
    ChangePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const actu = yield postgres_1.prisma.user.update({
                where: {
                    person_id: data.person_id,
                },
                data: {
                    password: data.password,
                },
            });
            return actu.person_id;
        });
    }
    Login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const Usuario_db = yield postgres_1.prisma.user.findMany({
                where: {
                    AND: [{ person_id: data.person_id }, { status: true }],
                },
                include: {
                    person: true,
                    role: {
                        include: {
                            role_permission: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                },
            });
            const resultado = Usuario_db.map((usuario) => {
                const permissions = usuario.role.role_permission.map((permission_actual) => {
                    return domain_1.PermissionEntity.fromdb({
                        id: permission_actual.permission.id,
                        name: permission_actual.permission.name,
                        type: permission_actual.permission.type,
                        table: permission_actual.permission.table,
                    });
                });
                const role = domain_1.RoleEntity.fromdb({
                    id: usuario.role.id,
                    name: usuario.role.name,
                    description: usuario.role.description,
                    premissions: permissions,
                });
                return new domain_1.UserEntity(usuario.person_id, true, usuario.password, role, usuario.LastIn, usuario.person.forename, usuario.person.surname, usuario.person.profile_picture_path);
            });
            return resultado[0];
        });
    }
}
exports.UserDataSourceImplementation = UserDataSourceImplementation;
function ActualizarFecha(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const fecha = new Date();
        const actualizacion = yield postgres_1.prisma.user.update({
            where: {
                person_id: id,
            },
            data: {
                LastIn: fecha,
            },
        });
    });
}
exports.ActualizarFecha = ActualizarFecha;
