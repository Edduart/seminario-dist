"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions_enum = exports.BitacoraLog = void 0;
class BitacoraLog {
    constructor(date, User_id, table, action, id) {
        this.date = date;
        this.User_id = User_id;
        this.table = table;
        this.action = action;
        this.id = id;
    }
    static fromObject(object) {
        const { ID, date, User_id, table, action } = object;
        const dATE_OBJ = new Date(date);
        return new BitacoraLog(dATE_OBJ, User_id, table, action, ID);
    }
}
exports.BitacoraLog = BitacoraLog;
var actions_enum;
(function (actions_enum) {
    actions_enum["DELETE"] = "DELETE";
    actions_enum["CREATE"] = "CREATE";
    actions_enum["UPDATE"] = "UPDATE";
    actions_enum["LOGIN"] = "LOGIN";
})(actions_enum || (exports.actions_enum = actions_enum = {}));
