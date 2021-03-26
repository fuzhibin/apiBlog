const fileService = require('../service/file.service')
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
        const result = await fileService.saveCoverPic(mimetype, destination, size, filename, encoding);
        ctx.body = result;
    }
}

module.exports = new FileController();