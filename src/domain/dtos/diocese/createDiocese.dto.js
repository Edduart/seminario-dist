"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDioceseDto = void 0;
class CreateDioceseDto {
    constructor(name, holder) {
        this.name = name;
        this.holder = holder;
    }
    static create(props) {
        const { name, holder } = props;
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
        const name_u = name.toUpperCase();
        const holder_u = holder.toUpperCase();
        return [undefined, new CreateDioceseDto(name_u, holder_u)];
    }
}
exports.CreateDioceseDto = CreateDioceseDto;
