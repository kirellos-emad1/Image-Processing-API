"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var image_1 = __importDefault(require("./api/image"));
var routes = express_1.default.Router();
routes.use('/api/images', image_1.default);
routes.get('/', function (request, response) {
    response.send("Welcome to resizer please follow the writing instructions in url /api/images?imageName=(filename)&width=(positive integer)&height=(positive integer)");
});
exports.default = routes;
