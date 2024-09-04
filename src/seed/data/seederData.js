"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelData = void 0;
const postgres_1 = require("../../data/postgres");
const _1 = require("./");
exports.modelData = {
    permission: { model: postgres_1.prisma.permission.createMany, data: _1.permissions },
    diocese: { model: postgres_1.prisma.diocese.createMany, data: _1.dioceses },
    redes: { model: postgres_1.prisma.social_media_category.createMany, data: _1.redes },
    stage: { model: postgres_1.prisma.stage.createMany, data: _1.stages },
    parish: { model: postgres_1.prisma.parish.createMany, data: _1.parishes },
    academic_field: { model: postgres_1.prisma.academic_field.createMany, data: _1.academics, },
    course: { model: postgres_1.prisma.course.createMany, data: _1.course },
    role: { model: postgres_1.prisma.role.createMany, data: _1.roles },
    role_permission: { model: postgres_1.prisma.role_permission.createMany, data: _1.rolePermissions, },
    person: { model: postgres_1.prisma.person.createMany, data: _1.person },
    user: { model: postgres_1.prisma.user.createMany, data: _1.user },
    subject: { model: postgres_1.prisma.subject.createMany, data: _1.subject },
};
