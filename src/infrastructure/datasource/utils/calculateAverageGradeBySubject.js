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
exports.calculateAverageGrade = void 0;
const calculateScore_1 = require("./calculateScore");
class calculateAverageGrade {
    static getAverageGradeBySubject(enrollments) {
        return __awaiter(this, void 0, void 0, function* () {
            let averageGradeInTheSubject = 0;
            let numberOfEnrollments = enrollments.length;
            for (const enrollment of enrollments) {
                let individualEnrollmentFinalGrade = 0;
                for (const testScore of enrollment.test_score) {
                    const { totalTestScore } = calculateScore_1.calculateTestScore.calculateIndividualScore(+testScore.test.maximum_score, +testScore.score);
                    individualEnrollmentFinalGrade += +totalTestScore.toFixed(2) / 10;
                }
                console.log({ individualEnrollmentFinalGrade });
                averageGradeInTheSubject += individualEnrollmentFinalGrade;
            }
            averageGradeInTheSubject = +(averageGradeInTheSubject / numberOfEnrollments).toFixed(2);
            const subjectAverageGrade = {
                subject: enrollments[0].subject.description,
                number_of_seminarians: numberOfEnrollments,
                average_grade: averageGradeInTheSubject,
            };
            console.log({ subjectAverageGrade });
            return subjectAverageGrade;
        });
    }
}
exports.calculateAverageGrade = calculateAverageGrade;
