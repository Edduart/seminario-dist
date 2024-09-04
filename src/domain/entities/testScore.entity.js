"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestScoreEntity = void 0;
class TestScoreEntity {
    constructor(test_id, seminarian_id, score) {
        this.test_id = test_id;
        this.seminarian_id = seminarian_id;
        this.score = score;
    }
    static fromObject(object) {
        const { test_id, seminarian_id, score } = object;
        if (!test_id)
            throw "Id is required";
        if (!seminarian_id)
            throw "seminarian_id ID is required";
        if (!score)
            throw "score is required";
        return new TestScoreEntity(test_id, seminarian_id, score);
    }
}
exports.TestScoreEntity = TestScoreEntity;
