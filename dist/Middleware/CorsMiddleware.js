"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
var cors_1 = __importDefault(require("cors"));
var CorsMiddleware = /** @class */ (function () {
    function CorsMiddleware() {
    }
    CorsMiddleware.prototype.getMiddleware = function () {
        return (0, cors_1.default)();
    };
    return CorsMiddleware;
}());
exports.CorsMiddleware = CorsMiddleware;
