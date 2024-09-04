"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaCategoryEntity = void 0;
class SocialMediaCategoryEntity {
    constructor(id, description, icon) {
        this.id = id;
        this.description = description;
        this.icon = icon;
    }
    static fromdb(object) {
        const { id, description, icon } = object;
        return new SocialMediaCategoryEntity(id, description, icon);
    }
}
exports.SocialMediaCategoryEntity = SocialMediaCategoryEntity;
