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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var imageChecking_1 = __importDefault(require("./imageChecking"));
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var imagesFolder = path_1.default.resolve("".concat(__dirname), '../../magic/images');
var thumbPath = path_1.default.resolve("".concat(__dirname), '../../magic/thumb');
var generateNew = function (fields) { return __awaiter(void 0, void 0, void 0, function () {
    var imagePath, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(fields.imageName === undefined)) return [3 /*break*/, 1];
                return [2 /*return*/, undefined];
            case 1:
                imagePath =
                    fields.width && fields.height
                        ? path_1.default.resolve(thumbPath, "".concat(fields.imageName, "-w").concat(fields.width, "-h").concat(fields.height, ".jpg"))
                        : path_1.default.resolve(imagesFolder, "".concat(fields.imageName, ".jpg"));
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fs_1.promises.access(imagePath)];
            case 3:
                _b.sent();
                return [2 /*return*/, imagePath];
            case 4:
                _a = _b.sent();
                return [2 /*return*/, undefined];
            case 5: return [2 /*return*/];
        }
    });
}); };
var resize = function (fields) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sharp_1.default)(fields.OldPath)
                        .resize(fields.Width, fields.Height)
                        .toFormat('jpg')
                        .toFile(fields.NewPath)];
            case 1:
                _b.sent();
                return [2 /*return*/];
            case 2:
                _a = _b.sent();
                return [2 /*return*/, 'failed to resize the image'];
            case 3: return [2 /*return*/];
        }
    });
}); };
var CreateThumbnail = function (fields) { return __awaiter(void 0, void 0, void 0, function () {
    var Width, Height, getImage, getThumb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(fields.height === undefined ||
                    fields.width === undefined ||
                    fields.imageName === undefined)) return [3 /*break*/, 1];
                return [2 /*return*/, undefined];
            case 1:
                getImage = path_1.default.resolve("".concat(imagesFolder), "".concat(fields.imageName, ".jpg"));
                getThumb = path_1.default.resolve("".concat(thumbPath), "".concat(fields.imageName, "-w").concat(fields.width, "-h").concat(fields.height, ".jpg"));
                Height = parseInt(fields.height || '');
                Width = parseInt(fields.width || '');
                if (!(!isNaN(Width) ||
                    (Width + '' !== '' && !isNaN(Height)) ||
                    Height + '' !== '')) return [3 /*break*/, 3];
                return [4 /*yield*/, resize({
                        OldPath: getImage,
                        NewPath: getThumb,
                        Height: parseInt(Height + ''),
                        Width: parseInt(Width + '')
                    })];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [2 /*return*/, undefined];
        }
    });
}); };
var validInputs = function (fields) { return __awaiter(void 0, void 0, void 0, function () {
    var existingImages, Height, Width;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, imageChecking_1.default.imageFounded(fields.imageName)];
            case 1:
                if (!((_a.sent()) === false)) return [3 /*break*/, 3];
                return [4 /*yield*/, "".concat(thumbPath, "/").concat(imageChecking_1.default.imageFounded)];
            case 2:
                existingImages = _a.sent();
                if (existingImages.length > 0) {
                    return [2 /*return*/, "Make Sure to Choose an image name and insert it in imageName from this List  ".concat(existingImages, ".")];
                }
                else {
                    return [2 /*return*/, undefined];
                }
                return [3 /*break*/, 4];
            case 3:
                if (fields.width === undefined && fields.height === undefined) {
                    return [2 /*return*/, undefined];
                }
                else if (fields.width !== undefined && fields.height !== undefined) {
                    Width = parseInt(fields.width || '');
                    Height = parseInt(fields.height || '');
                    if (Number.isNaN(Width) ||
                        Width < 1 ||
                        Number.isNaN(Height) ||
                        Height < 1) {
                        return [2 /*return*/, 'Make Sure To Choose Positive Numbers For The Width and Height'];
                    }
                    else {
                        return [2 /*return*/, undefined];
                    }
                }
                else {
                    return [2 /*return*/, undefined];
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    generateNew: generateNew,
    CreateThumbnail: CreateThumbnail,
    resize: resize,
    validInputs: validInputs,
    imagesFolder: imagesFolder,
    thumbPath: thumbPath
};
