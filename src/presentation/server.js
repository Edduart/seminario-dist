"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.DeleteExpiredTokens = exports.BlackList = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    limit: 60,
    standardHeaders: 'draft-7',
    statusCode: 429,
    legacyHeaders: false,
});
exports.BlackList = [];
function DeleteExpiredTokens() {
    const horaactual = new Date();
    const horahace30minutos = new Date(horaactual.getTime() - 30 * 60 * 1000);
    exports.BlackList = exports.BlackList.filter(item => item.time >= horahace30minutos);
}
exports.DeleteExpiredTokens = DeleteExpiredTokens;
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, cors_1.default)());
            this.app.use("/images", express_1.default.static("images"));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use(limiter);
            this.app.use(this.routes);
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        });
    }
}
exports.Server = Server;
