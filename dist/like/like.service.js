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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LikeService = class LikeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async likePost(postId, userId) {
        try {
            const post = await this.prisma.post.findUnique({ where: { id: postId } });
            if (!post) {
                console.error('Post not found for postId:', postId);
                throw new common_1.NotFoundException('Post not found');
            }
            const existingLike = await this.prisma.like.findFirst({
                where: {
                    postId,
                    userId,
                },
            });
            if (existingLike) {
                console.error('User already liked the post:', { postId, userId });
                throw new Error('You already liked this post');
            }
            const like = await this.prisma.like.create({
                data: {
                    postId,
                    userId,
                },
            });
            return like;
        }
        catch (error) {
            console.error('Error in likePost:', error.message);
            if (error instanceof common_1.NotFoundException ||
                error.message === 'You already liked this post') {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred while liking the post');
        }
    }
    async unlikePost(postId, userId) {
        try {
            const like = await this.prisma.like.findFirst({
                where: {
                    postId,
                    userId,
                },
            });
            if (!like) {
                console.error('Like not found for postId and userId:', {
                    postId,
                    userId,
                });
                throw new common_1.NotFoundException('Like not found');
            }
            const deletedLike = await this.prisma.like.delete({
                where: {
                    id: like.id,
                },
            });
            return deletedLike;
        }
        catch (error) {
            console.error('Error in unlikePost:', error.message);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred while unliking the post');
        }
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LikeService);
//# sourceMappingURL=like.service.js.map