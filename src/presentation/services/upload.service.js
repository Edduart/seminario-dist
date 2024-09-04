"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = exports.updateFile = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getDestination = (req) => {
    const routeName = req.baseUrl;
    const route = "./images" + routeName;
    return route;
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const destinationFolder = getDestination(req);
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const filename = req.params.id + "." + file.mimetype.split("/")[1];
        const filePath = path_1.default.join(getDestination(req), filename);
        if (fs_1.default.existsSync(filePath)) {
            cb(new Error("File already exist"), "");
        }
        cb(null, filename);
        req.body.ayuda = path_1.default.join(getDestination(req), filename);
    },
});
const fileFilter = function (req, file, cb) {
    if (file === undefined) {
        req.body.ayuda = null;
        return cb(null, false);
    }
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = "Solo archivos de imagen";
        return cb(null, false);
    }
    const filename = req.params.id + "." + file.mimetype.split("/")[1];
    const filePath = path_1.default.join(getDestination(req), filename);
    if (fs_1.default.existsSync(filePath)) {
        cb(new Error("I don't have a clue!"));
    }
    cb(null, true);
};
const storageUpdate = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const destinationFolder = getDestination(req);
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        const filename = req.params.id + "." + file.mimetype.split("/")[1];
        cb(null, filename);
        req.body.ayuda = path_1.default.join(getDestination(req), filename);
    },
});
exports.uploadFile = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
exports.updateFile = (0, multer_1.default)({
    storage: storageUpdate,
    fileFilter: fileFilter,
});
class ImageService {
    static Service_Guardar(req, res, next) {
        try {
            console.log(req.body);
            exports.updateFile.single("file");
            next();
        }
        catch (error) {
            res.status(400).json("error de imagen");
        }
    }
}
exports.ImageService = ImageService;
