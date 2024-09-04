"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DioceseEntity = void 0;
class DioceseEntity {
    constructor(id, name, holder) {
        this.id = id;
        this.name = name;
        this.holder = holder;
    }
    static fromObject(object) {
        const { id, name, holder } = object;
        if (!id)
            throw "Id is required";
        if (!name)
            throw "text is required";
        if (!holder)
            throw "text is required";
        return new DioceseEntity(id, name, holder);
    }
}
exports.DioceseEntity = DioceseEntity;
