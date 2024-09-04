"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job_Psotion_Enum = exports.WorkerEntity = void 0;
class WorkerEntity {
    constructor(position, person) {
        this.position = position;
        this.person = person;
    }
    static fromdb(person, position) {
        return new WorkerEntity(position, person);
    }
}
exports.WorkerEntity = WorkerEntity;
var Job_Psotion_Enum;
(function (Job_Psotion_Enum) {
    Job_Psotion_Enum["Mantenimiento"] = "MANTENIMIENTO";
    Job_Psotion_Enum["Cocinero"] = "COCINERO";
    Job_Psotion_Enum["Transportista"] = "TRANSPORTISTA";
})(Job_Psotion_Enum || (exports.Job_Psotion_Enum = Job_Psotion_Enum = {}));
