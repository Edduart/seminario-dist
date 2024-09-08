"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaEntity = void 0;
class SocialMediaEntity {
    constructor(category, link, id, social_media_category, person_id) {
        this.category = category;
        this.link = link;
        this.id = id;
        this.social_media_category = social_media_category;
        this.person_id = person_id;
    }
    static fromdb(object) {
        const { category, link, id, social_media_category } = object;
        return new SocialMediaEntity(category, link, id, social_media_category);
    }
}
exports.SocialMediaEntity = SocialMediaEntity;
