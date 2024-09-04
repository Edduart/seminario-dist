"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizar = exports.guardar = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/worker');
    },
    filename: function (req, file, cb) {
        const filename = req.params.id + '.' + file.mimetype.split('/')[1];
        const filePath = path_1.default.join('./images/worker', filename);
        if (fs_1.default.existsSync(filePath)) {
            return cb(new Error('File already exists'), '');
        }
        cb(null, filename);
        req.body.ayuda = path_1.default.join('./images/worker', filename);
    }
});
const fileFilter = function (req, file, cb) {
    if (file === undefined) {
        req.body.ayuda = null;
        return cb(null, false);
    }
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Solo archivos de imagen';
        return cb(null, false);
    }
    cb(null, true);
};
const storage_U = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/worker');
    },
    filename: function (req, file, cb) {
        const filename = req.params.id + '.' + file.mimetype.split('/')[1];
        cb(null, filename);
        req.body.ayuda = path_1.default.join('./images/worker', filename);
    }
});
exports.guardar = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
exports.actualizar = (0, multer_1.default)({ storage: storage_U, fileFilter: fileFilter });
