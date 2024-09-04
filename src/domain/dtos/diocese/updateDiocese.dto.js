"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDioceseDto = void 0;
class UpdateDioceseDto {
    constructor(id, name, holder) {
        this.id = id;
        this.name = name;
        this.holder = holder;
    }
    get values() {
        const returnObj = {};
        if (this.name)
            returnObj.name = this.name;
        if (this.holder)
            returnObj.holder = this.holder;
        return returnObj;
    }
    static update(props) {
        const { id, name, holder } = props;
        if (!id || isNaN(Number(id))) {
            return ["Id must be a number > 0 and integer"];
        }
        if (!name) {
            return ["Name is required"];
        }
        else if (typeof name !== "string") {
            return ["Name must be a string"];
        }
        if (!holder) {
            return ["Holder is required"];
        }
        else if (typeof holder !== "string") {
            return ["Holder must be a string"];
        }
        let name_u = name.toUpperCase();
        let hold_u = holder.toUpperCase();
        return [undefined, new UpdateDioceseDto(id, name_u, hold_u)];
    }
}
exports.UpdateDioceseDto = UpdateDioceseDto;
