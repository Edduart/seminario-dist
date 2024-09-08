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
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encode = void 0;
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
function encode(PassToEncode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = yield (0, bcrypt_1.hashSync)(PassToEncode, saltRounds);
            return hash;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.encode = encode;
function compare(PassToCompare, hashToCompare) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = (0, bcrypt_1.compareSync)(PassToCompare, hashToCompare);
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.compare = compare;
