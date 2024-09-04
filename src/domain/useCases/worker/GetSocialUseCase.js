"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSocials = void 0;
class GetSocials {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.GetSocial();
    }
}
exports.GetSocials = GetSocials;
