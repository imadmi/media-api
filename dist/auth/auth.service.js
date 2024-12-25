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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email');
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new common_1.UnauthorizedException('Invalid email or password');
    }
    async login(user) {
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return {
            ...user,
            token,
        };
    }
    async register(email, fullName, password) {
        const existingUser = await this.userService.findByEmail(email);
        console.log("🚀 ~ AuthService ~ register ~ existingUser:", existingUser);
        if (existingUser) {
            throw new common_1.HttpException({ success: false, message: 'User already exists, try sign in' }, common_1.HttpStatus.CONFLICT);
        }
        const newUser = await this.userService.createUser(email, fullName, password);
        if (!newUser) {
            throw new common_1.HttpException({ success: false, message: 'Failed to create user' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const userWithAccessToken = await this.login(newUser);
            return { success: true, userWithAccessToken };
        }
        catch (error) {
            throw new common_1.HttpException({ success: false, message: 'Internal server error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async oauth2(email, fullName, picture) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            const userWithAccessToken = await this.login(existingUser);
            return { success: true, userWithAccessToken };
        }
        const newUser = await this.userService.createUser(email, fullName, picture);
        if (!newUser) {
            throw new common_1.HttpException({ success: false, message: 'Failed to create user' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const userWithAccessToken = await this.login(newUser);
            return { success: true, userWithAccessToken };
        }
        catch (error) {
            throw new common_1.HttpException({ success: false, message: 'Internal server error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map