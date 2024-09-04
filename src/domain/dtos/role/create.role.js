"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoleStruc = void 0;
class CreateRoleStruc {
    constructor(name, description, numbers) {
        this.name = name;
        this.description = description;
        this.numbers = numbers;
    }
    static Create(props) {
        const { name, description, numbers } = props;
        if (!name)
            return ['Name property is required', undefined];
        let descri_i = description.toUpperCase();
        let name_u = name.toUpperCase();
        return [undefined, new CreateRoleStruc(name_u, descri_i, numbers)];
    }
}
exports.CreateRoleStruc = CreateRoleStruc;
