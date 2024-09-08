"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSocialMedia = void 0;
class CreateSocialMedia {
    constructor(social_media_category, link) {
        this.social_media_category = social_media_category;
        this.link = link;
    }
    Validate() {
        let errorarray = [];
        if (!this.social_media_category)
            errorarray.push("Social media Category ID is required");
        if (!this.link)
            errorarray.push("social link is required");
        if (typeof this.link !== 'string')
            errorarray.push("social link only supports characters");
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
exports.CreateSocialMedia = CreateSocialMedia;
