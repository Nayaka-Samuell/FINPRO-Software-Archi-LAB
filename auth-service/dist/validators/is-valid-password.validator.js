"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidPassword = void 0;
const class_validator_1 = require("class-validator");
let IsValidPassword = class IsValidPassword {
    validate(text, args) {
        if (!text)
            return false;
        if (text.length < 8)
            return false;
        if (text.includes(' '))
            return false;
        const digitMatches = text.match(/\d/g);
        if (!digitMatches || digitMatches.length < 2)
            return false;
        return true;
    }
    defaultMessage(args) {
        return 'Password must be at least 8 characters, contain no spaces, and have at least 2 numeric digits.';
    }
};
exports.IsValidPassword = IsValidPassword;
exports.IsValidPassword = IsValidPassword = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isValidPassword', async: false })
], IsValidPassword);
//# sourceMappingURL=is-valid-password.validator.js.map