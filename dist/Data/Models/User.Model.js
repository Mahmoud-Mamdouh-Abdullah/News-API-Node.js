"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var BaseModel_1 = require("../../Core/Database/BaseModel");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(firstName, lastName, password, email, age) {
        var _this = _super.call(this) || this;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.password = password;
        _this.email = email;
        _this.age = age;
        return _this;
    }
    return User;
}(BaseModel_1.BaseModel));
exports.User = User;
