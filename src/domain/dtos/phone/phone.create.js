"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePhone = void 0;
class CreatePhone {
    constructor(phone_number, description) {
        this.phone_number = phone_number;
        this.description = description;
    }
    Validate() {
        let errorarray = [];
        if (!this.phone_number)
            errorarray.push("phone number is required");
        if (!this.description)
            errorarray.push("cellphone description is required");
        if (!/^\d{1,15}$/.test(this.phone_number))
            errorarray.push("Cellphone must have only numbers");
        if (typeof this.phone_number !== 'string')
            errorarray.push("category must be a string");
        if (typeof this.description !== 'string')
            errorarray.push("link only supports characters");
        if (errorarray.length > 0) {
            return errorarray.join(",");
        }
        return null;
    }
}
exports.CreatePhone = CreatePhone;
