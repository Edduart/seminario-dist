"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEnrollmentDto = void 0;
class CreateEnrollmentDto {
    constructor(seminarian_id, subject_id, academic_term_id) {
        this.seminarian_id = seminarian_id;
        this.subject_id = subject_id;
        this.academic_term_id = academic_term_id;
    }
    static create(props) {
        let { seminarian_id, subject_id, academic_term_id } = props;
        let validationErrors = [];
        console.log({ props });
        if (!seminarian_id) {
            validationErrors.push({
                field: "seminarian_id",
                message: "seminarian_id is required!",
            });
        }
        else if (!/^(V|E)-\d{1,18}$/.test(seminarian_id)) {
            validationErrors.push({
                field: "seminarian_id",
                message: "Seminarian_id must follows this format: V-xxxxxx!",
            });
        }
        if (!Array.isArray(subject_id)) {
            validationErrors.push({
                field: "subject_id",
                message: "subject_id is should be a valid array!",
            });
        }
        if (Array.isArray(subject_id)) {
            console.log("es array");
            if (subject_id.length == 0) {
                validationErrors.push({
                    field: "subject_id",
                    message: "subject_id is required!",
                });
            }
            else {
                subject_id.forEach((element) => {
                    if (Number.isNaN(element) ||
                        !Number.isInteger(element) ||
                        element <= 0) {
                        validationErrors.push({
                            field: "subject_id",
                            message: "subject_id must be a valid array of numbers > to 0!",
                        });
                    }
                });
            }
        }
        if (!academic_term_id) {
            validationErrors.push({
                field: "academic_term_id",
                message: "academic_term_id is required!!",
            });
        }
        else if (Number.isNaN(academic_term_id) ||
            !Number.isInteger(academic_term_id) ||
            academic_term_id <= 0) {
            validationErrors.push({
                field: "academic_term_id",
                message: "academic_term_id must be a valid ID!",
            });
        }
        if (validationErrors.length > 0) {
            console.error("CreateEnrollmentDto", { validationErrors });
            return [validationErrors];
        }
        return [
            undefined,
            new CreateEnrollmentDto(seminarian_id, subject_id, academic_term_id),
        ];
    }
}
exports.CreateEnrollmentDto = CreateEnrollmentDto;
