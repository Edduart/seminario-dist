"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSeminarian = void 0;
const __1 = require("../..");
class UpdateSeminarian {
    constructor(foreing_Data, location, apostleships, person, ministery, status, stage, stage_num) {
        this.foreing_Data = foreing_Data;
        this.location = location;
        this.apostleships = apostleships;
        this.person = person;
        this.ministery = ministery;
        this.status = status;
        this.stage = stage;
        this.stage_num = stage_num;
    }
    Validate() {
        var _a;
        console.log(this.status);
        let errorarray = [];
        const result_user = this.person.Validate();
        const result_foreing = (_a = this.foreing_Data) === null || _a === void 0 ? void 0 : _a.Validate();
        if (!(this.ministery in __1.seminarianMinistery_ENUM))
            errorarray.push("Invalid ministery");
        if (!(this.location in __1.Locations_enum))
            errorarray.push("Invalid location");
        if (!(this.status in __1.seminarian_status_enum))
            errorarray.push("Invalid status");
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
exports.UpdateSeminarian = UpdateSeminarian;
