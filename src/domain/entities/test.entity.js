"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
class TestEntity {
    constructor(id, subject_id, academic_term_id, description, status, maximum_score) {
        this.id = id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
        this.description = description;
        this.status = status;
        this.maximum_score = maximum_score;
    }
    static fromObject(object) {
        let { id, subject_id, academic_term_id, description, status, maximum_score, } = object;
        if (!id)
            throw "Id is required";
        if (!subject_id)
            throw "subject ID is required";
        if (!academic_term_id)
            throw "Academic term is required";
        if (!description)
            throw "description is required";
        if (!maximum_score)
            throw "maximum_score is required";
        return new TestEntity(id, subject_id, academic_term_id, description, status, maximum_score);
    }
}
exports.TestEntity = TestEntity;
