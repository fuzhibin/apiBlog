const md5Password = require('../utils/password-handle')

const userService = require('../service/user.service')
const articleService = require('../service/article.service')
const fs = require('fs')
class UserController {
    async create(ctx, next) {
        const { username, password } = ctx.request.body;
        const result = await userService.create(username, md5Password(password));
        ctx.body = result;
    }
    async getUserArticle(ctx, next) {
        const { id, name } = ctx.user;
        const { limit, offset } = ctx.query;
        const result = await articleService.getUserArticles(id, limit, offset);
        ctx.body = result;
    }
    async getUserAvatar(ctx, next) {
        const { userId } = ctx.params;
        const result = await articleService.getUserAvatar(userId);
        ctx.response.set('content-type', result.mimetype);
        ctx.body = fs.createReadStream(`${result.avatar}`)
    }
    async getUserInfo(ctx, next) {
        const { id } = ctx.user;
        const result = await userService.getUserInfo(id);
        ctx.body = result;
    }
}

module.exports = new UserController();