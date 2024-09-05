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
exports.calculateTestScore = void 0;
const envs_1 = require("../../../config/envs");
const postgres_1 = require("../../../data/postgres");
const formatDate_1 = require("../../../presentation/utils/formatDate");
const subjectScorePassMark = envs_1.envs.MINIMAL_GRADE;
class calculateTestScore {
    static calculateTestScoreFromSubject(testScoreBySubject) {
        return __awaiter(this, void 0, void 0, function* () {
            const decimalNumbers = 2;
            console.log(testScoreBySubject.map((test) => test));
            if (testScoreBySubject.length == 0) {
                return testScoreBySubject;
            }
            else {
                const calculateScore = testScoreBySubject.map((seminarian) => {
                    let seminarianGradeAverageCounter = 0;
                    let numberOfEnrollments = 0;
                    return {
                        seminarian_id: seminarian.id,
                        seminarian_surname: seminarian.user.person.surname,
                        seminarian_forename: seminarian.user.person.forename,
                        enrollment: seminarian.enrollment.map((subject) => {
                            var _a, _b;
                            numberOfEnrollments++;
                            let totalSubjectScore = 0;
                            let totalGradedScore = 0;
                            let totalSubjectScoreOutOf10 = 0;
                            let totalGradedScoreOutOf10 = 0;
                            return {
                                subject_id: subject.subject_id,
                                subject_name: subject.subject.description,
                                subject_status: subject.status,
                                enrollment_id: subject.enrollment_id,
                                academic_term_id: subject.academic_term.id,
                                start_date: (0, formatDate_1.formatDate)(subject.academic_term.start_date.toISOString()),
                                end_date: (0, formatDate_1.formatDate)(subject.academic_term.end_date.toISOString()),
                                academic_term_status: subject.academic_term.status,
                                test_score: ((_a = subject.test_score) === null || _a === void 0 ? void 0 : _a.length) === 0
                                    ? [{ error: "no test added by the teacher!" }]
                                    : (_b = subject.test_score) === null || _b === void 0 ? void 0 : _b.map((individualTest) => {
                                        if (individualTest.score == 0) {
                                            return {
                                                message: "STILL NO GRADED BY THE TEACHER!",
                                                test_description: individualTest.test.description,
                                                test_score_out_of_20: "1 / 20",
                                                test_score_out_max_test_score: individualTest.test.maximum_score,
                                            };
                                        }
                                        else {
                                            const { testScore, maxScore, totalTestScore } = this.calculateIndividualScore(individualTest.score, individualTest.test.maximum_score);
                                            const formattedTestScore = testScore.toFixed(decimalNumbers);
                                            const formattedTotalTestScore = totalTestScore.toFixed(decimalNumbers);
                                            totalSubjectScore += +totalTestScore;
                                            totalGradedScore += +maxScore;
                                            seminarianGradeAverageCounter -=
                                                totalSubjectScoreOutOf10;
                                            totalSubjectScoreOutOf10 =
                                                (totalSubjectScore / 100) * 10;
                                            totalGradedScoreOutOf10 =
                                                (totalGradedScore / 100) * 10;
                                            console.log("inside the second loop", {
                                                totalSubjectScore,
                                                totalSubjectScoreOutOf10,
                                            });
                                            seminarianGradeAverageCounter +=
                                                totalSubjectScoreOutOf10;
                                            return {
                                                test_description: individualTest.test.description,
                                                test_score_out_of_20: testScore < 1
                                                    ? "1.00"
                                                    : formattedTestScore + " / 20",
                                                test_score_out_max_test_score: totalTestScore < 1
                                                    ? "1.00"
                                                    : formattedTotalTestScore + " / " + maxScore,
                                                test_score_was_edited: individualTest.last_edited_date == null
                                                    ? "No"
                                                    : (0, formatDate_1.formatDate)(individualTest.last_edited_date.toISOString()),
                                            };
                                        }
                                    }),
                                subject_total_score_out_of_graded_score: totalSubjectScore < 1
                                    ? "1.00"
                                    : totalSubjectScore.toFixed(decimalNumbers) +
                                        " / " +
                                        totalGradedScore,
                                subject_total_score_out_of_graded_scored_10_scale: totalSubjectScoreOutOf10 < 1
                                    ? "1.00"
                                    : totalSubjectScoreOutOf10.toFixed(decimalNumbers) +
                                        " / " +
                                        totalGradedScoreOutOf10,
                                subject_total_score_out_of_graded_scored_20_scale: totalSubjectScoreOutOf10 < 1
                                    ? "1.00"
                                    : +totalSubjectScoreOutOf10.toFixed(decimalNumbers) * 2 +
                                        " / " +
                                        totalGradedScoreOutOf10 * 2,
                            };
                        }),
                        grade_point_average: seminarianGradeAverageCounter / numberOfEnrollments < 1
                            ? "1.00"
                            : (seminarianGradeAverageCounter / numberOfEnrollments).toFixed(decimalNumbers),
                    };
                });
                return calculateScore;
            }
        });
    }
    static calculateFinalSubjectScore(testScoreBySubject) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (testScoreBySubject.length > 0) {
                for (const subject of testScoreBySubject) {
                    let totalSubjectScore = 0;
                    let totalSubjectScoreOutOf10 = 0;
                    if (subject.test_score.length === 0) {
                        console.log("No test score: ", subject.seminarian_id, subject.subject_id);
                    }
                    else {
                        for (const individualTest of subject.test_score) {
                            const { totalTestScore } = yield this.calculateIndividualScore(individualTest.score, individualTest.test.maximum_score);
                            totalSubjectScore += totalTestScore;
                            totalSubjectScoreOutOf10 = (totalSubjectScore / 100) * 10;
                        }
                    }
                    if (totalSubjectScoreOutOf10 > subjectScorePassMark) {
                        console.log("APROBADO ,final subject score: ", { totalSubjectScoreOutOf10 }, subject.seminarian_id, (_a = subject.test) === null || _a === void 0 ? void 0 : _a.description);
                        yield postgres_1.prisma.enrollment.update({
                            where: { enrollment_id: subject.enrollment_id },
                            data: { status: "APROBADO" },
                        });
                    }
                    else {
                        console.log("REPROBADO ,final subject score: ", { totalSubjectScoreOutOf10 }, subject.seminarian_id, (_b = subject.test) === null || _b === void 0 ? void 0 : _b.description);
                        yield postgres_1.prisma.enrollment.update({
                            where: { enrollment_id: subject.enrollment_id },
                            data: { status: "REPROBADO" },
                        });
                    }
                }
            }
            return { status: "Ok" };
        });
    }
    static calculateIndividualScore(individualScore, maximumTestScore) {
        const testScore = individualScore;
        const maxScore = maximumTestScore;
        const totalTestScore = (testScore / 20) * maxScore;
        return { testScore, maxScore, totalTestScore };
    }
}
exports.calculateTestScore = calculateTestScore;
