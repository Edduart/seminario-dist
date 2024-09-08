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
exports.CourseDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class CourseDataSourceImpl {
    create(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const createCourse = yield postgres_1.prisma.course.create({
                data: createDto,
            });
            return domain_1.CourseEntity.fromObject(createCourse);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield postgres_1.prisma.course.findMany();
            console.log(courses);
            const result = courses.map((courses) => {
                return domain_1.CourseEntity.fromObject(courses);
            });
            console.log(result);
            return result;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield postgres_1.prisma.course.findUnique({
                where: {
                    id: id,
                },
            });
            if (!course)
                throw `Course with id ${id} not found`;
            return domain_1.CourseEntity.fromObject(course);
        });
    }
    updateById(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🚀 ~ CourseDataSourceImpl ~ updateById ~ updateDto:", updateDto);
            if (updateDto.instructor_id) {
                const checkInstructor = yield postgres_1.prisma.instructor.findUnique({
                    where: {
                        professor_id: updateDto.instructor_id,
                        NOT: { OR: [{ instructor_position: "DESACTIVADO" }, { status: 0 }] },
                    },
                });
                if (!checkInstructor)
                    throw `instructor ID ${updateDto.instructor_id} does'nt exist or is disabled`;
            }
            yield this.findById(updateDto.id);
            const updateCourse = yield postgres_1.prisma.course.update({
                where: { id: updateDto.id },
                data: {
                    instructor_id: updateDto.instructor_id,
                },
            });
            return domain_1.CourseEntity.fromObject(updateCourse);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findById(id);
            const deleteCourse = yield postgres_1.prisma.course.delete({
                where: { id: id },
            });
            return domain_1.CourseEntity.fromObject(deleteCourse);
        });
    }
}
exports.CourseDataSourceImpl = CourseDataSourceImpl;
