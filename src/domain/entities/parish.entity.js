"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParishEntity = void 0;
class ParishEntity {
    constructor(id, diocese_id, name, patron) {
        this.id = id;
        this.diocese_id = diocese_id;
        this.name = name;
        this.patron = patron;
    }
    static fromObject(object) {
        const { id, diocese_id, name, patron } = object;
        if (!id)
            throw 'Id is required';
        if (!diocese_id)
            throw 'Diocese_id is required';
        if (!name)
            throw 'text is required';
        if (!patron)
            throw "patron is required";
        return new ParishEntity(id, diocese_id, name, patron);
    }
}
exports.ParishEntity = ParishEntity;
