"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegreeEntity = void 0;
class DegreeEntity {
    constructor(id, description, link, user_id) {
        this.id = id;
        this.description = description;
        this.link = link;
        this.user_id = user_id;
    }
    static fromdb(object) {
        const { id, description, link, user_id } = object;
        return new DegreeEntity(id, description, link, user_id);
    }
}
exports.DegreeEntity = DegreeEntity;
