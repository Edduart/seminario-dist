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
exports.updateFile = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getDestination = (req) => {
    const basePath = req.baseUrl;
    const imagePath = "./images" + basePath;
    return imagePath;
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const destinationFolder = getDestination(req);
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const filename = req.params.id + "." + file.mimetype.split("/")[1];
        cb(null, filename);
        req.body.ayuda = path_1.default.join(getDestination(req), filename);
    },
});
const CreateFileFilter = function (req, file, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const allowedExtensions = [".jpg", ".jpeg", ".png"];
        const extension = path_1.default.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            return cb(new Error("Only valid image files are allowed (JPG, JPEG, PNG)"));
        }
        const filename = req.params.id;
        const constFolderPath = getDestination(req);
        ;
        const files = yield fs_1.default.promises.readdir(constFolderPath);
        const existingFile = files.find((file) => {
            return file.toLowerCase().startsWith(filename.toLowerCase());
        });
        if (existingFile) {
            return cb(new Error(`File with the same name already exists ${existingFile}`));
        }
        cb(null, true);
    });
};
exports.uploadFile = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: CreateFileFilter,
});
const UpdateFileFilter = function (req, file, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const allowedExtensions = [".jpg", ".jpeg", ".png"];
        const extension = path_1.default.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            return cb(new Error("Only valid image files are allowed (JPG, JPEG, PNG)"));
        }
        cb(null, true);
    });
};
exports.updateFile = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: UpdateFileFilter,
});
