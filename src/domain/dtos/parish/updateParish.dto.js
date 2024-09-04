"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParishDto = void 0;
class UpdateParishDto {
    constructor(id, diocese_id, name, patron) {
        this.id = id;
        this.diocese_id = diocese_id;
        this.name = name;
        this.patron = patron;
    }
    get values() {
        const returnObj = {};
        if (this.diocese_id)
            returnObj.diocese_id = this.diocese_id;
        if (this.name)
            returnObj.name = this.name;
        if (this.patron)
            returnObj.patron = this.patron;
        return returnObj;
    }
    static update(props) {
        const { id, diocese_id, name, patron } = props;
        let errorarray = [];
        if (!id)
            errorarray.push("ID must be a valid number");
        if (!diocese_id)
            errorarray.push("Diocese_id is required");
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
        return [undefined, new UpdateParishDto(id, diocese_id, name_u, patron_u)];
    }
}
exports.UpdateParishDto = UpdateParishDto;
