"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(),
    MINIMAL_GRADE: (0, env_var_1.get)("MIN_NOTA_APROBATORIA").required().asFloatPositive(),
    SERVER_ADDRESS: (0, env_var_1.get)("SERVER_ADDRESS").required().asUrlString(),
};
