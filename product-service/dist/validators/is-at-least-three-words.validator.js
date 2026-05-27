"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAtLeastThreeWords = void 0;
const class_validator_1 = require("class-validator");
let IsAtLeastThreeWords = class IsAtLeastThreeWords {
    validate(text, args) {
        if (!text)
            return false;
        const words = text.trim().split(/\s+/);
        return words.length >= 3;
    }
    defaultMessage(args) {
        return 'Name must contain at least 3 words.';
    }
};
exports.IsAtLeastThreeWords = IsAtLeastThreeWords;
exports.IsAtLeastThreeWords = IsAtLeastThreeWords = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isAtLeastThreeWords', async: false })
], IsAtLeastThreeWords);
//# sourceMappingURL=is-at-least-three-words.validator.js.map