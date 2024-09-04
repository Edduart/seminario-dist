"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorTo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const server_1 = require("../server");
class ValidatorTo {
    static ValidarToken(req, res, next) {
        const Token = req.headers['auth'];
        if (!Token) {
            return res.status(401).send("Invalid access token not found");
        }
        jsonwebtoken_1.default.verify(Token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid access token not valid");
            }
            const result = server_1.BlackList.find((Blacklist_interface) => Blacklist_interface.Token == Token);
            if (result == undefined) {
                const data_json = decoded;
                req.body.Permisos = data_json.Permisos;
                if (server_1.BlackList.length > 0) {
                    (0, server_1.DeleteExpiredTokens)();
                }
                next();
            }
            else {
                return res.status(401).send("Invalid access token in black list");
            }
        });
    }
    static ValidarTokenH(req, res, next) {
        const Token = req.headers['auth'];
        if (!Token) {
            return res.status(401).send("Invalid access");
        }
        jsonwebtoken_1.default.verify(Token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid access");
            }
            const result = server_1.BlackList.find((Blacklist_interface) => Blacklist_interface.Token == Token);
            if (result == undefined) {
                const data_json = decoded;
                req.headers['Permissions'] = data_json.Permisos;
                if (server_1.BlackList.length > 0) {
                    (0, server_1.DeleteExpiredTokens)();
                }
                next();
            }
            else {
                return res.status(401).send("Invalid access");
            }
        });
    }
    static Eliminate(req, res) {
        const Token = req.headers['auth'];
        const enter = {
            Token: Token,
            time: new Date()
        };
        server_1.BlackList.push(enter);
        res.json("Session terminated").send;
    }
}
exports.ValidatorTo = ValidatorTo;
