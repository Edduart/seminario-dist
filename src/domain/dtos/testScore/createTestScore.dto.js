"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestScoreDto = void 0;
class CreateTestScoreDto {
    constructor(tests, enrollmentIds, testIds) {
        this.tests = tests;
        this.enrollmentIds = enrollmentIds;
        this.testIds = testIds;
    }
    static create(props) {
        let { tests_score } = props;
        let validationErrors = [];
        let allEnrollmentIds = [];
        let allTestId = [];
        let allScores = [];
        tests_score.forEach((test) => {
            if (isNaN(Number(test.enrollment_id)) ||
                typeof test.enrollment_id == "string" ||
                test.enrollment_id < 0)
                throw "data error in any enrollment_id";
            allEnrollmentIds.push(test.enrollment_id);
            test.test.map((test2) => {
                if (isNaN(Number(test2.test_id)) ||
                    typeof test2.test_id == "string" ||
                    test2.test_id < 0)
                    throw "data error in any test_id";
                allTestId.push(test2.test_id);
                if (isNaN(Number(test2.score)) ||
                    typeof test2.score == "string" ||
                    test2.score < 0 ||
                    test2.score > 20)
                    throw "data error in any score";
                allScores.push(test2.score);
            });
        });
        const enrollmentIds = [...new Set(allEnrollmentIds)];
        const testIds = [...new Set(allTestId)];
        console.log({ enrollmentIds, testIds, allScores });
        const prepareTestScore = tests_score.reduce((accumulator, test) => {
            return accumulator.concat(test.test.map((assignment) => ({
                enrollment_id: test.enrollment_id,
                test_id: assignment.test_id,
                score: assignment.score,
                last_edited_date: null
            })));
        }, []);
        console.log({ prepareTestScore });
        if (validationErrors.length > 0) {
            console.error("CreateEnrollmentDto", { validationErrors });
            return [validationErrors];
        }
        return [
            undefined,
            new CreateTestScoreDto(prepareTestScore, enrollmentIds, testIds),
        ];
    }
}
exports.CreateTestScoreDto = CreateTestScoreDto;
[];
