"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePerson = void 0;
const __1 = require("../..");
class CreatePerson {
    constructor(id, profile_picture_path, forename, surname, email, birthdate, medical_record, Blood, cellphone, media) {
        this.id = id;
        this.profile_picture_path = profile_picture_path;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.birthdate = birthdate;
        this.medical_record = medical_record;
        this.Blood = Blood;
        this.cellphone = cellphone;
        this.media = media;
    }
    Validate() {
        var _a, _b;
        let errorarray = [];
        let auxiliary = undefined;
        const result_cell = (_a = this.cellphone) === null || _a === void 0 ? void 0 : _a.map((cell_actual) => {
            auxiliary = cell_actual.Validate();
            if (auxiliary != null)
                return auxiliary;
        });
        auxiliary = undefined;
        const CreateSocialMedia = (_b = this.media) === null || _b === void 0 ? void 0 : _b.map((media_actua) => {
            auxiliary = media_actua.Validate();
            if (auxiliary != null)
                return auxiliary;
        });
        if (!/^(V|E)-\d{1,18}$/.test(this.id))
            errorarray.push("person ID follows this format: V-xxxxxx ");
        if (!(this.Blood in __1.BloodType))
            errorarray.push("Invalid type of blood");
        if (!this.forename)
            errorarray.push("Forename is required");
        if (!this.surname)
            errorarray.push("Surname is required");
        if (!this.email)
            errorarray.push("email is required");
        if (!this.birthdate)
            errorarray.push("Birthdate is required");
        if ((this.forename.length < 0) || (this.forename.length > 100))
            errorarray.push("Forename must be between 3 and 100 characters");
        if ((this.surname.length < 0) || (this.surname.length > 100))
            errorarray.push("Surname must be between 3 and 100 characters");
        if ((this.email.length < 0) || (this.email.length > 100))
            errorarray.push("email must be between 4 and 200 characters");
        const birth_date = new Date(this.birthdate);
        const hoy = new Date();
        const years = hoy.getFullYear() - birth_date.getFullYear();
        if ((years >= 120) || (years <= 16)) {
            errorarray.push("Birthdate invalid");
        }
        result_cell === null || result_cell === void 0 ? void 0 : result_cell.forEach(element => {
            if ((element != null))
                errorarray.push("," + element);
        });
        CreateSocialMedia === null || CreateSocialMedia === void 0 ? void 0 : CreateSocialMedia.forEach(element => {
            if ((element != null))
                errorarray.push("," + element);
        });
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreatePerson = CreatePerson;
