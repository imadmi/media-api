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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const passport_1 = require("@nestjs/passport");
const posts_service_1 = require("../posts/posts.service");
let LikeController = class LikeController {
    constructor(likeService, postsService) {
        this.likeService = likeService;
        this.postsService = postsService;
    }
    async likePost(postId, req) {
        const userId = this.postsService.getUserId(req);
        return this.likeService.likePost(Number(postId), userId);
    }
    async unlikePost(postId, req) {
        const userId = this.postsService.getUserId(req);
        return this.likeService.unlikePost(Number(postId), userId);
    }
};
exports.LikeController = LikeController;
__decorate([
    (0, common_1.Post)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "unlikePost", null);
exports.LikeController = LikeController = __decorate([
    (0, common_1.Controller)('like'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [like_service_1.LikeService,
        posts_service_1.PostsService])
], LikeController);
//# sourceMappingURL=like.controller.js.map