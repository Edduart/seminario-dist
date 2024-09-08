"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHorario = void 0;
class UpdateHorario {
    constructor(id, link) {
        this.id = id;
        this.link = link;
    }
    static CreateDTO(object) {
        let { id, link } = object;
        console.log({ object });
        let errorarray = [];
        if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
            errorarray.push("ID must be a non-negative integer");
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new UpdateHorario(id, link)];
    }
}
exports.UpdateHorario = UpdateHorario;
