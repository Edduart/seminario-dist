"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleStruc = void 0;
class UpdateRoleStruc {
    constructor(id, name, description, numbers) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.numbers = numbers;
    }
    get values() {
        const returnObj = {};
        if (this.name)
            returnObj.name = this.name;
        if (this.description)
            returnObj.description = this.description;
        return returnObj;
    }
    static Create(props) {
        const { id, name, description, numbers } = props;
        if (!id || isNaN(Number(id))) {
            return ['id must be a number > 0 and integer'];
        }
        if (name == '') {
            return ['Name is requered'];
        }
        let descri_i = description.toUpperCase();
        return [undefined, new UpdateRoleStruc(id, name, descri_i, numbers)];
    }
}
exports.UpdateRoleStruc = UpdateRoleStruc;
