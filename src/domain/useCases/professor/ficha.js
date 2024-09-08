"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FichaUsePRofe = void 0;
class FichaUsePRofe {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.Ficha(id);
    }
}
exports.FichaUsePRofe = FichaUsePRofe;
