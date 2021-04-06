const md5Password = require('../utils/password-handle')

const userService = require('../service/user.service');
const articleService = require('../service/article.service');
const coverService = require('../service/cover.service')
const path = require('path');
const {
    DEFAULT_AVATAR_PATH
} = require('../constants/file-path')

const fs = require('fs')
class UserController {
    async create(ctx, next) {
        const { username, password } = ctx.request.body;
        const result = await userService.create(username, md5Password(password), DEFAULT_AVATAR_PATH);
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
    async getUserDeatilInfo(ctx, next) {
        const { id } = ctx.user;
        const result = await userService.getUserDeatilInfo(id);
        ctx.body = {
            age: result.age,
            avatar: result.avatarUrl,
            email: result.email,
            name: result.name,
        };
    }
    async updataUserInfo(ctx, next) {
        const { age, email, name } = ctx.query;
        const { id } = ctx.user;
        const result = await userService.updataUserInfo(id, age, email, name);
        ctx.body = {
            flag: true,
            message: '修改成功~'
        }
    }
    async deleteUserAll(ctx, next) {
        const { id } = ctx.user;
        //删除发表的文章及文章记录
        const result = await articleService.getUserAllArticles(id);
        result.forEach(async value => {
            value.covers.forEach(async cover => {
                fs.unlink(path.join(cover.filePath, cover.fileName));
                //删除coverimg里面的记录
                await coverService.deleteCoverimgById(cover.id);
            });
            fs.unlink(path.join(value.filePath, value.fileName));
            await articleService.deleteArticle(value.id);
        });
        await userService.deleteUser(id);
        ctx.body = {
            message: '删除成功~'
        }
    }
}

module.exports = new UserController();