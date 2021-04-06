const fileService = require('../service/file.service');
const coverService = require('../service/cover.service');
const userService = require('../service/user.service');
const {
    APP_PATH,
    APP_PORT
} = require('../app/config')
const fs = require('fs')
const path = require('path');
class FileController {
    async saveArticle(ctx, next) {
        const { title } = ctx.req.body;
        console.log(title);
        const { destination, size, mimetype, filename, encoding } = ctx.req.file;
        const { id } = ctx.user;
        const result = await fileService.saveArticle(title, id, mimetype, destination, filename, size, encoding);
        ctx.body = result;
    }
    async saveCoverPic(ctx, next) {
        console.log(ctx.req.file);
        const { destination, size, mimetype, filename, encoding } = ctx.req.file;
        const { articleId } = ctx.params;
        console.log(articleId);
        const result = await fileService.saveCoverPic(mimetype, destination, size, filename, encoding);
        const isExists = await coverService.getExistsCoverImg(articleId);
        console.log(isExists);
        if (isExists) {
            await coverService.updateArticleAndCover(articleId, result.insertId)
        } else {
            await coverService.saveArticleAndCover(articleId, result.insertId);
        }
        ctx.body = {
            status: 200,
            message: "封面上传成功~"
        };
    }
    async saveAvatar(ctx, next) {
        const { destination, filename, mimetype } = ctx.req.file;
        const avatarPath = path.join(destination, filename);
        const { id } = ctx.user;
        /***
         * 判断用户的头像是否存在，如果已经存在了，就先删除如果还没有就修改
         */
        const user = await userService.findUserAvatar(id);
        if (user.avatar) {
            fs.unlinkSync(user.avatar);
        }
        /**
         * 保存头像信息
         */
        await fileService.saveAvatar(id, avatarPath, mimetype);
        /**
         * 返回头像地址
         */
        const result = await userService.findUserAvatar(id);
        ctx.body = {
            // avatarUrl:''
            avatarUrl: result.avatarUrl,
            message: '头像上传成功~'
        }
    }
    async saveAttache(ctx, next) {
        const { destination, filename, mimetype } = ctx.req.file;
        console.log(ctx.req.file);
        const attachPath = path.join(destination, filename);
        const result = await fileService.saveAttach(attachPath, mimetype);
        ctx.body = {
            insertId: result.insertId,
            attachUrl: `${APP_PATH}:${APP_PORT}/picture/` + result.insertId
        }
    }
}

module.exports = new FileController();