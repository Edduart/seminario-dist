"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestDto = void 0;
class UpdateTestDto {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }
    get values() {
        const returnObj = {};
        if (this.description)
            returnObj.description = this.description;
        return returnObj;
    }
    static update(props) {
        let { id, description } = props;
        let dataErrors = [];
        if (dataErrors.length > 0)
            return [dataErrors];
        console.log(props);
        if (!id) {
            dataErrors.push("id is required");
        }
        else {
            if (isNaN(Number(id)) || id < 0) {
                dataErrors.push("id must be a valid ID");
            }
        }
        if (!description) {
            dataErrors.push("description is required");
        }
        else {
            if (typeof description !== "string" ||
                description.length < 4 ||
                description.length > 100) {
                dataErrors.push("description is invalid, must be longer than 4 letters and no longer than 100");
            }
        }
        if (dataErrors.length > 0)
            return [dataErrors];
        return [undefined, new UpdateTestDto(id, description.toUpperCase())];
    }
}
exports.UpdateTestDto = UpdateTestDto;
