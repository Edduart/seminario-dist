"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDegree = void 0;
class CreateDegree {
    constructor(user_id, description, link) {
        this.user_id = user_id;
        this.description = description;
        this.link = link;
    }
    Validate() {
        let errorarray = [];
        if (this.description == "" && this.link == "") {
            return null;
        }
        if (!this.description)
            errorarray.push("Degree description is required");
        if (!this.link)
            errorarray.push("degree link is required");
        if (this.description.length > 200)
            errorarray.push("Parish name  is too long");
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreateDegree = CreateDegree;
