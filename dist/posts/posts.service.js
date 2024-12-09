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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt = require("jsonwebtoken");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.getUserId = (req) => {
            try {
                const token = this.getJwt(req);
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded) {
                    return decoded.sub;
                }
                return null;
            }
            catch (error) {
                throw new Error('Invalid or expired token');
            }
        };
    }
    getJwt(req) {
        const jwt = req.headers.authorization?.split(' ')[1];
        return jwt;
    }
    async create(data, req) {
        const userId = this.getUserId(req);
        return this.prisma.post.create({
            data: {
                authorId: userId,
                ...data,
            },
        });
    }
    async findAll() {
        return this.prisma.post.findMany({
            include: {
                author: true,
                likes: true,
                comments: {
                    include: {
                        author: {
                            select: {
                                fullName: true,
                                login: true,
                                picture: true,
                            },
                        },
                    },
                },
                reposts: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        return this.prisma.post.findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.prisma.post.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.post.delete({
            where: { id },
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map