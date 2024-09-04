"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
class CreateUserDTO {
    constructor(person, degree, parish_id, role, password) {
        this.person = person;
        this.degree = degree;
        this.parish_id = parish_id;
        this.role = role;
        this.password = password;
    }
    Validate() {
        let errorarray = [];
        const result_person = this.person.Validate();
        let auxiliary = undefined;
        if (result_person != null)
            errorarray.push(result_person);
        let result_degree = [];
        if (this.degree != undefined && this.degree.length > 0) {
            const result_degree = this.degree.map((degree_actual) => {
                auxiliary = degree_actual.Validate();
                if (auxiliary != null)
                    return auxiliary;
            });
        }
        if (!this.person)
            errorarray.push("Person is required");
        if (!this.role)
            errorarray.push("Role is required");
        result_degree === null || result_degree === void 0 ? void 0 : result_degree.forEach(element => {
            if ((element != null))
                errorarray.push("," + element);
        });
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreateUserDTO = CreateUserDTO;
