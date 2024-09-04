"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateForeingSeminarian = void 0;
class CreateForeingSeminarian {
    constructor(seminary_name, stage, stage_year) {
        this.seminary_name = seminary_name;
        this.stage = stage;
        this.stage_year = stage_year;
    }
    Validate() {
        let errorarray = [];
        if ((this.seminary_name.length < 6) || (this.seminary_name.length > 200))
            errorarray.push("Seminary name must be between 6 and 200 characters");
        if (isNaN(Number(this.stage_year)))
            errorarray.push("Stage_year must be a number");
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreateForeingSeminarian = CreateForeingSeminarian;
