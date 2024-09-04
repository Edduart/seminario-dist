"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParishDto = void 0;
class CreateParishDto {
    constructor(diocese_id, name, patron) {
        this.diocese_id = diocese_id;
        this.name = name;
        this.patron = patron;
    }
    static create(props) {
        const { diocese_id, name, patron } = props;
        let errorarray = [];
        if (!diocese_id)
            errorarray.push("diocese_id is required");
        if (!name)
            errorarray.push("Name is required");
        if (!patron)
            errorarray.push("Patron is required");
        if (isNaN(Number(diocese_id)))
            errorarray.push("Diocese_id must be a number");
        if (typeof name !== 'string')
            errorarray.push("Name only supports characters");
        if (typeof patron !== 'string')
            errorarray.push("Patron only supports characters");
        if (name.length > 100)
            errorarray.push("Parish name  is too long");
        if (name.length < 5 && name)
            errorarray.push("Parish name is too short");
        if (patron.length > 100)
            errorarray.push("Patron name is too long");
        if (patron.length < 5 && patron)
            errorarray.push("Patron name is too short");
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        let name_u = name.toUpperCase();
        let patron_u = patron.toUpperCase();
        return [undefined, new CreateParishDto(diocese_id, name_u, patron_u)];
    }
}
exports.CreateParishDto = CreateParishDto;
