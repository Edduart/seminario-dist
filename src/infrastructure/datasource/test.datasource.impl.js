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
exports.TestDataSourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const calculateScore_1 = require("./utils/calculateScore");
const calculateAverageGradeBySubject_1 = require("./utils/calculateAverageGradeBySubject");
class TestDataSourceImpl {
    GetSeminarianListWithNotes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const errolments = yield this.getTestBySubject(new domain_1.GetTestBySubjectDto(undefined, undefined, data.subject_id, data.academic_term_id, undefined));
            let persons = [];
            let notas = [];
            errolments.forEach((Element) => {
                const result = Element.enrollment[0].subject_total_score_out_of_graded_scored_10_scale.split("/")[0];
                const notenum = Number(result);
                if (data.menor_a_la_nota) {
                    if (notenum <= data.note) {
                        persons.push(Element.seminarian_id);
                        notas.push(notenum);
                    }
                }
                else {
                    if (notenum >= data.note) {
                        persons.push(Element.seminarian_id);
                        notas.push(notenum);
                    }
                }
            });
            let where_clause_foreing = undefined;
            if (data.foreing != undefined) {
                where_clause_foreing = data.foreing ? { isNot: null } : { is: null };
            }
            const result_seminarian = yield postgres_1.prisma.person.findMany({
                where: {
                    id: {
                        in: persons
                    }, user: {
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
                }, include: {
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
            const entities = result_seminarian.map((actual) => {
                var _a;
                const aux = persons.findIndex((element) => element == actual.id);
                const number = notas[aux != undefined ? aux : 0];
                return domain_1.SeminarianListDTO.fromdb({
                    id: actual.id,
                    forename: actual.forename,
                    surname: actual.surname,
                    email: actual.email,
                    diocesi_name: (_a = actual.user) === null || _a === void 0 ? void 0 : _a.parish.diocese,
                    note: number
                });
            });
            return entities;
        });
    }
    getAverageGradeBySubject(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const enrollments = yield postgres_1.prisma.enrollment.findMany({
                where: {
                    academic_term_id: dto.academic_term_id,
                    subject_id: dto.subject_id,
                },
                include: {
                    subject: { select: { description: true } },
                    test_score: { select: { score: true, test: { select: { id: true, maximum_score: true } } } },
                },
            });
            if (enrollments.length == 0)
                throw "The subject don't exist or don't have any enrollments";
            const subjectAverageGrade = yield calculateAverageGradeBySubject_1.calculateAverageGrade.getAverageGradeBySubject(enrollments);
            return subjectAverageGrade;
        });
    }
    getTestForTestScore(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ dto });
            const testsResult = yield postgres_1.prisma.test.findMany({
                where: {
                    AND: [
                        { subject_id: dto.subject_id },
                        { academic_term_id: dto.academic_term_id },
                        { status: true },
                    ],
                },
                select: { id: true, description: true, maximum_score: true },
            });
            const seminariansResult = yield postgres_1.prisma.enrollment.findMany({
                where: {
                    AND: [
                        { subject_id: dto.subject_id },
                        { academic_term_id: dto.academic_term_id },
                        { status: "CURSANDO" },
                    ],
                },
                include: {
                    test_score: { select: { test_id: true, score: true } },
                    seminarian: {
                        select: {
                            user: {
                                select: { person: { select: { forename: true, surname: true } } },
                            },
                        },
                    },
                },
            });
            const resultMap = {
                tests: testsResult.map((test) => ({
                    id: test.id,
                    description: test.description,
                    maximum_score: Number(test.maximum_score.toFixed(2)),
                })),
                seminarians: seminariansResult.map((seminarians) => {
                    let testCounter = -1;
                    return {
                        enrollment_id: seminarians.enrollment_id,
                        seminarian_id: seminarians.seminarian_id,
                        seminarian_surname: seminarians.seminarian.user.person.forename,
                        seminarian_forename: seminarians.seminarian.user.person.surname,
                        test_score: seminarians.test_score.length == 0
                            ? testsResult.map((noScoredTest) => ({
                                test_id: noScoredTest.id,
                                score: 0,
                            }))
                            : testsResult.map((test_score) => {
                                const scoredTests = seminarians.test_score.map((test) => test.score);
                                testCounter++;
                                return {
                                    test_id: test_score.id,
                                    score: testCounter >= scoredTests.length
                                        ? 0
                                        : scoredTests[testCounter],
                                };
                            }),
                    };
                }),
            };
            return resultMap;
        });
    }
    getTestBySubject(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(dto);
            const testScoreBySeminarian = yield postgres_1.prisma.seminarian.findMany({
                where: {
                    id: dto.seminarian_id,
                    enrollment: {
                        some: {
                            academic_term_id: dto.academic_term_id,
                            subject_id: dto.subject_id,
                            enrollment_id: dto.enrollment_id,
                            status: dto.status,
                        },
                    },
                },
                select: {
                    id: true,
                    user: {
                        select: { person: { select: { surname: true, forename: true } } },
                    },
                    enrollment: {
                        where: {
                            academic_term_id: dto.academic_term_id,
                            subject_id: dto.subject_id,
                            enrollment_id: dto.enrollment_id,
                            status: dto.status,
                        },
                        select: {
                            enrollment_id: true,
                            subject_id: true,
                            status: true,
                            subject: { select: { description: true } },
                            test_score: { include: { test: true } },
                            academic_term: {
                                select: {
                                    id: true,
                                    start_date: true,
                                    end_date: true,
                                    status: true,
                                },
                            },
                        },
                    },
                },
            });
            const testScoreCalculated = yield calculateScore_1.calculateTestScore.calculateTestScoreFromSubject(testScoreBySeminarian);
            return testScoreCalculated;
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateExist(dto);
            const testExistingQuantity = yield postgres_1.prisma.test.findMany({
                where: {
                    subject_id: dto.subject_id,
                    academic_term_id: dto.academic_term_id,
                    status: true,
                },
                select: { maximum_score: true },
            });
            yield this.calculateMaxTestConstrain(testExistingQuantity, dto);
            const createTest = yield postgres_1.prisma.test.createMany({
                data: dto.tests.map((tests) => ({
                    subject_id: dto.subject_id,
                    academic_term_id: dto.academic_term_id,
                    maximum_score: tests.maximum_score,
                    description: tests.description.toUpperCase(),
                })),
            });
            return createTest;
        });
    }
    get(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield postgres_1.prisma.test.findMany({
                where: {
                    id: dto.id,
                    subject_id: dto.subject_id,
                    status: dto.status,
                    academic_term_id: dto.academic_term_id,
                },
            });
            const resultMapping = test.map((tests) => ({
                id: tests.id,
                subject_id: tests.subject_id,
                academic_term_id: tests.academic_term_id,
                description: tests.description,
                status: tests.status,
                maximum_score: +tests.maximum_score,
            }));
            [];
            return resultMapping;
        });
    }
    update(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateIfExist = yield postgres_1.prisma.test.findUnique({
                where: { id: dto.id },
            });
            if (!validateIfExist)
                throw `the test id does't exist`;
            const test = yield postgres_1.prisma.test.update({
                where: { id: dto.id },
                data: dto.values,
            });
            return domain_1.TestEntity.fromObject(test);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateIfExist = yield postgres_1.prisma.test.findUnique({
                where: { id: id },
            });
            if (!validateIfExist)
                throw `the test id does't exist`;
            const checkIfHaveTestScore = yield postgres_1.prisma.test_score.findMany({
                where: { test_id: id },
            });
            if (checkIfHaveTestScore.length > 0)
                throw `cannot delete a test if already have seminarians with this test added!`;
            const test = yield postgres_1.prisma.test.update({
                where: { id: id },
                data: { status: false },
            });
            return domain_1.TestEntity.fromObject(test);
        });
    }
    validateExist(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [instruction, enrollment, subject, academicTerm] = yield Promise.all([
                yield postgres_1.prisma.instruction.findFirst({
                    where: {
                        subject_id: dto.subject_id,
                        academic_term_id: dto.academic_term_id,
                    },
                }),
                postgres_1.prisma.enrollment.findMany({
                    where: {
                        subject_id: dto.subject_id,
                        academic_term_id: dto.academic_term_id,
                    },
                }),
                postgres_1.prisma.subject.findUnique({
                    where: { id: dto.subject_id },
                }),
                postgres_1.prisma.academic_term.findUnique({
                    where: { id: dto.academic_term_id },
                }),
            ]);
            if (!enrollment)
                throw `Enrollment with subject ID: ${dto.subject_id} , academic term ID: ${dto.academic_term_id}, doesn't exist`;
            if (!instruction)
                throw `Instruction with ${dto.subject_id} and academic term ID: ${dto.academic_term_id}, doesn't exist`;
            if (!subject)
                throw `Subject ID ${dto.subject_id} doesn't exist!`;
            if (!academicTerm)
                throw `Academic term ID ${dto.academic_term_id} doesn't exist!`;
        });
    }
    calculateMaxTestConstrain(testExistingQuantity, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let maximumScoreCounter = 0;
            if (testExistingQuantity.length > 0)
                throw `There are already existing tests for this subject, you cannot create more`;
            if (dto.tests.length < 2 || dto.tests.length > 6)
                throw `the minimum tests is 2 and max 6, now is ${dto.tests.length}`;
            dto.tests.forEach((test) => {
                maximumScoreCounter += test.maximum_score;
            });
            if (maximumScoreCounter !== 100)
                throw `the sum of all test maximum score need to be 100, now is: ${maximumScoreCounter}`;
        });
    }
}
exports.TestDataSourceImpl = TestDataSourceImpl;
