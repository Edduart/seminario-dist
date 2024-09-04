"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneEntity = void 0;
class PhoneEntity {
    constructor(phone_number, description, person_id, id) {
        this.phone_number = phone_number;
        this.description = description;
        this.person_id = person_id;
        this.id = id;
    }
    static fromdb(object) {
        const { phone_number, description } = object;
        return new PhoneEntity(phone_number, description);
    }
}
exports.PhoneEntity = PhoneEntity;
