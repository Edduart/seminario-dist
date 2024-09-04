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
        return [undefined, new UpdateTestDto(id, description.toUpperCase())];
    }
}
exports.UpdateTestDto = UpdateTestDto;
