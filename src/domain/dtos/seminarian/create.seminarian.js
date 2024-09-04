"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeminarian = void 0;
const __1 = require("../..");
class CreateSeminarian {
    constructor(foreing_Data, location, stage, apostleships, user, ministery, stage_num) {
        this.foreing_Data = foreing_Data;
        this.location = location;
        this.stage = stage;
        this.apostleships = apostleships;
        this.user = user;
        this.ministery = ministery;
        this.stage_num = stage_num;
    }
    Validate() {
        var _a;
        let errorarray = [];
        const result_user = this.user.Validate();
        const result_foreing = (_a = this.foreing_Data) === null || _a === void 0 ? void 0 : _a.Validate();
        if (!(this.ministery in __1.seminarianMinistery_ENUM))
            errorarray.push("Invalid ministery");
        if (!(this.location in __1.Locations_enum))
            errorarray.push("Invalid location");
        if (result_user != null) {
            errorarray.push(result_user);
        }
        switch (this.stage) {
            case "PROPEDEUTICO":
                this.stage_num = 1;
                break;
            case "DISCIPULADO":
                this.stage_num = 2;
                break;
            case "CONFIGURATIVA":
                this.stage_num = 3;
                break;
        }
        if (result_foreing != null) {
            errorarray.push(result_foreing);
        }
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreateSeminarian = CreateSeminarian;
