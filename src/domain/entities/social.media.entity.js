"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaEntity = void 0;
class SocialMediaEntity {
    constructor(social_media_category, link, id, person_id) {
        this.social_media_category = social_media_category;
        this.link = link;
        this.id = id;
        this.person_id = person_id;
    }
    static fromdb(object) {
        const { social_media_category, link } = object;
        return new SocialMediaEntity(social_media_category, link);
    }
}
exports.SocialMediaEntity = SocialMediaEntity;
