"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWorker = void 0;
const entities_1 = require("../../entities");
class CreateWorker {
    constructor(persona, job_position) {
        this.persona = persona;
        this.job_position = job_position;
    }
    Validate() {
        let errorarray = [];
        const result = this.persona.Validate();
        if (result != null)
            errorarray.push(result);
        if (!(this.job_position in entities_1.Job_Psotion_Enum))
            errorarray.push("Invalid work position");
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreateWorker = CreateWorker;
