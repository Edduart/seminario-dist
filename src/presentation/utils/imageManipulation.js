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
exports.imageResize = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
function imageResize(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("checking image");
        console.log([{ filePath }]);
        try {
            if (!fs_1.default.existsSync(filePath)) {
                console.log("file does'nt exist");
                return yield setDefaultProfileImage(filePath);
            }
            else {
                const file = fs_1.default.readFileSync(filePath);
                const image = yield (0, sharp_1.default)(filePath).metadata();
                const maxWidth = 212;
                const maxHeight = 237;
                if (image.width > maxWidth || image.height > maxHeight) {
                    console.log("trying to resize image");
                    const resizedImage = yield (0, sharp_1.default)(file)
                        .resize({ width: maxWidth, height: maxHeight })
                        .toBuffer();
                    yield fs_1.default.writeFileSync(filePath, resizedImage);
                }
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.imageResize = imageResize;
function setDefaultProfileImage(destinationFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultProfileImage = "./images/assests/profile_icon.jpeg";
        console.log("running copy");
        try {
            const readDefaultImage = yield fs_1.default.readFileSync(defaultProfileImage);
            yield fs_1.default.writeFileSync(destinationFilePath, readDefaultImage);
        }
        catch (error) {
            return error;
        }
    });
}
