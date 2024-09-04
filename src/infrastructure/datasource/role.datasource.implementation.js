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
exports.RoleDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class RoleDataSourceImpl {
    create(sper) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield postgres_1.prisma.role.findFirst({
                where: { name: sper.name }
            });
            if (exists) {
                throw `Usuario ya tiene un nombre registrado`;
            }
            const result = yield postgres_1.prisma.role.create({
                data: {
                    name: sper.name,
                    description: sper.description,
                }
            });
            const data = sper.numbers.map((number) => {
                return { role_id: result.id, permission_id: number };
            });
            yield postgres_1.prisma.role_permission.createMany({
                data: data
            });
            const result_individual = yield this.getRoleMultiple(result.id, undefined);
            return result_individual[0];
        });
    }
    GetAllPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            const from_db = yield postgres_1.prisma.permission.findMany({
                where: { id: {
                        notIn: [29, 30]
                    } }
            });
            return from_db.map(permiso => domain_1.PermissionEntity.fromdb(permiso));
        });
    }
    Update(nuevo) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield postgres_1.prisma.role.findFirst({
                where: { AND: [
                        { name: nuevo.name },
                    ], NOT: { id: nuevo.id } }
            });
            if (exists) {
                throw `Usuario ya tiene un nombre registrado`;
            }
            yield postgres_1.prisma.role_permission.deleteMany({
                where: {
                    AND: [
                        { role_id: nuevo.id },
                        { permission_id: {
                                notIn: [29, 30]
                            } }
                    ]
                }
            });
            const result = yield postgres_1.prisma.role.update({
                where: { id: nuevo.id },
                data: { name: nuevo.name, description: nuevo.description }
            });
            const data = nuevo.numbers.map((number) => {
                return { role_id: result.id, permission_id: number };
            });
            yield postgres_1.prisma.role_permission.createMany({
                data: data
            });
            const result_individual = yield this.getRoleMultiple(result.id, undefined);
            return result_individual[0];
        });
    }
    getRoleMultiple(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let roles_baseD;
            roles_baseD = yield postgres_1.prisma.role.findMany({
                where: {
                    AND: [
                        { id: id },
                        { name: name },
                        { id: { notIn: [1] } }
                    ]
                },
                include: {
                    role_permission: { include: { permission: true } }
                }
            });
            const roleEntities = roles_baseD.map(rol => {
                const permissions = rol.role_permission.map(rolePermission => {
                    return domain_1.PermissionEntity.fromdb({
                        id: rolePermission.permission.id,
                        name: rolePermission.permission.name,
                        type: rolePermission.permission.type,
                        table: rolePermission.permission.table,
                    });
                });
                return domain_1.RoleEntity.fromdb({
                    id: rol.id,
                    name: rol.name,
                    description: rol.description,
                    premissions: permissions
                });
            });
            return roleEntities;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield postgres_1.prisma.role_permission.deleteMany({
                where: {
                    role_id: id
                }
            });
            yield postgres_1.prisma.role.delete({
                where: {
                    id: id
                }
            });
            return null;
        });
    }
}
exports.RoleDataSourceImpl = RoleDataSourceImpl;
