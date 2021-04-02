const fileService = require('../service/file.service');
const coverService = require('../service/cover.service');
const path = require('path');
class FileController {
    async saveArticle(ctx, next) {
        const { destination, size, mimetype, filename, encoding } = ctx.req.file;
        const { id } = ctx.user;
        const { title } = ctx.req.body;
        const result = await fileService.saveArticle(title, id, mimetype, destination, filename, size, encoding);
        ctx.body = result;
    }
    async saveCoverPic(ctx, next) {
        console.log(ctx.req.file);
        const { destination, size, mimetype, filename, encoding } = ctx.req.file;
        const { articleId } = ctx.req.body;
        const result = await fileService.saveCoverPic(mimetype, destination, size, filename, encoding);
        await coverService.saveArticleAndCover(articleId, result.insertId);
        ctx.body = {
            status: 200,
            message: "封面上传成功~"
        };
    }
    async saveAvatar(ctx, next) {
        const { destination, filename, mimetype } = ctx.req.file;
        const avatarPath = path.join(destination, filename);
        const { id } = ctx.user;
        const result = await fileService.saveAvatar(id, avatarPath, mimetype);
        ctx.body = {
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
            attachUrl: 'http://localhost:8000/picture/' + result.insertId
        }
    }
}

module.exports = new FileController();