"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
let UserArgs = class UserArgs {
    constructor() {
        this.skip = 0;
        this.take = 25;
    }
};
__decorate([
    (0, graphql_1.Field)((_type) => graphql_1.Int, {
        nullable: true,
        description: 'skip prop',
    }),
    __metadata("design:type", Object)
], UserArgs.prototype, "skip", void 0);
__decorate([
    (0, graphql_1.Field)((_type) => graphql_1.Int, {
        nullable: true,
        description: 'take prop',
    }),
    __metadata("design:type", Object)
], UserArgs.prototype, "take", void 0);
UserArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UserArgs);
exports.UserArgs = UserArgs;
//# sourceMappingURL=usermaker.dto.js.map