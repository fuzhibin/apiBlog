const articleService = require('../service/article.service')
const fs = require('fs')
class ArticelController {
    async getArticleList(ctx, next) {
        const { limit, offset } = ctx.query;
        const result = await articleService.getArticlesList(limit, offset);
        ctx.body = result;
    }
    async getArticleDetailById(ctx, next) {
        const { articleId } = ctx.params;
        const [result] = await articleService.getArticleDetailById(articleId);
        console.log(result);
        // 2.提供文件信息
        try {
            ctx.response.set('content-type', result.mimetype);
            ctx.response.set('Transfer-Encoding', result.encoding);
            ctx.body = fs.createReadStream(`${result.filePath}/${result.fileName}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ArticelController();