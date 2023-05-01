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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
let User = class User {
};
__decorate([
    (0, graphql_1.Field)((_type) => graphql_1.ID, {
        nullable: false,
        description: 'id atm',
        defaultValue: '00000000-0000-0000-0000-000000000000',
        name: 'id',
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Directive)('@upper'),
    __metadata("design:type", String)
], User.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        description: 'description atm',
        defaultValue: '',
        name: 'description',
    }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: false,
        description: 'date created',
        name: 'creation_date',
        defaultValue: new Date(),
    }),
    __metadata("design:type", Date)
], User.prototype, "creationDate", void 0);
__decorate([
    (0, graphql_1.Field)((_type) => [String], {
        nullable: false,
        description: 'ingredients description',
        name: 'ingredients',
        defaultValue: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "ingredients", void 0);
User = __decorate([
    (0, graphql_1.ObjectType)({ description: 'user schema object' })
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map