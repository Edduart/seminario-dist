"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBitDTO = void 0;
const entities_1 = require("../../entities");
class GetBitDTO {
    constructor(date1, date2, User_id, table, action, id) {
        this.date1 = date1;
        this.date2 = date2;
        this.User_id = User_id;
        this.table = table;
        this.action = action;
        this.id = id;
    }
    static GetBitDTO(object) {
        let errorarray = [];
        let { id, date1, date2, User_id, table, action } = object;
        if (User_id != undefined)
            if (!/^(V|E)-\d{1,18}$/.test(User_id))
                errorarray.push("person ID follows this format: V-xxxxxx ");
        if (date1 != undefined && date2 != undefined) {
            date1 = new Date(date1);
            date2 = new Date(date2);
        }
        if (action != undefined) {
            if (!(action in entities_1.actions_enum))
                errorarray.push("invalid action type");
        }
        if (id != undefined) {
            if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
                errorarray.push("ID must be a non-negative integer");
            }
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new GetBitDTO(date1, date2, User_id, table, action, id)];
    }
}
exports.GetBitDTO = GetBitDTO;
