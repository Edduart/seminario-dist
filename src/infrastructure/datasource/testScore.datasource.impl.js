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
exports.TestScoreDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
class TestScoreDataSourceImpl {
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateExist(dto.enrollmentIds, dto.testIds);
            const createTestScore = yield postgres_1.prisma.test_score.createMany({
                data: dto.tests,
                skipDuplicates: true,
            });
            return createTestScore;
        });
    }
    get(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const testScore = yield postgres_1.prisma.test_score.findMany({
                where: { test_id: dto.test_id, enrollment_id: dto.enrollment_id },
                include: {
                    enrollment: {
                        select: {
                            seminarian: {
                                select: {
                                    user: {
                                        select: {
                                            person: {
                                                select: { id: true, forename: true, surname: true },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            return testScore;
        });
    }
    update(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateExist(dto.enrollmentIds, dto.testIds);
            let count = 0;
            let updateTest = {};
            for (const test of Object.values(dto.tests)) {
                yield postgres_1.prisma.test_score.upsert({
                    where: {
                        test_id_enrollment_id: {
                            enrollment_id: test.enrollment_id,
                            test_id: test.test_id,
                        },
                    },
                    create: {
                        enrollment_id: test.enrollment_id,
                        test_id: test.test_id,
                        score: test.score,
                    },
                    update: {
                        enrollment_id: test.enrollment_id,
                        test_id: test.test_id,
                        score: test.score,
                    },
                });
                count++;
            }
            updateTest = { count };
            return updateTest;
        });
    }
    validateExist(enrollmentIds, testIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const [enrollment, test, test_score] = yield Promise.all([
                yield postgres_1.prisma.enrollment.findMany({
                    where: { enrollment_id: { in: enrollmentIds } },
                }),
                yield postgres_1.prisma.test.findMany({
                    where: { id: { in: testIds } },
                }),
                yield postgres_1.prisma.test_score.findMany({
                    where: {
                        AND: [
                            { enrollment_id: { in: enrollmentIds } },
                            { test_id: { in: testIds } },
                        ],
                    },
                }),
            ]);
            console.log("test score check", { test_score });
            if (enrollment.length !== enrollmentIds.length)
                throw "one or more enrollment_id doesn't exist";
            if (test.length !== testIds.length)
                throw "one or more test_id doesn't exist";
        });
    }
}
exports.TestScoreDataSourceImpl = TestScoreDataSourceImpl;
