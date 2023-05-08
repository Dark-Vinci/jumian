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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const logger_1 = require("sdk/dist/logger");
const user_service_1 = require("./user.service");
const user_model_1 = require("./models/user.model");
const usermaker_dto_1 = require("./DTO/usermaker.dto");
let UserResolver = class UserResolver extends logger_1.ProxyLogger {
    constructor(userService, logger) {
        super(logger, {
            packageName: 'UserResolver',
        });
        this.userService = userService;
    }
    getUsers(recipesArgs) {
        console.log({ recipesArgs });
        const meta = this.logMetadata(crypto.randomUUID(), 'getUsers');
        return this.userService.findAll();
    }
};
__decorate([
    (0, graphql_1.Query)((_returns) => [user_model_1.User]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usermaker_dto_1.UserArgs]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)((_of) => user_model_1.User),
    __param(1, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        common_1.Logger])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map