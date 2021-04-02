const articleService = require('../service/article.service')
const fs = require('fs');
const path = require('path');
const fileService = require('../service/file.service');
const {
    ARTICLE_PATH
} = require('../constants/file-path')
const md = require('markdown-it')({
    html: true
});
class ArticelController {
    async getArticleList(ctx, next) {
        const { limit, offset } = ctx.query;
        const result = await articleService.getArticlesList(limit, offset);
        ctx.body = result;
    }
    async getArticleDetailById(ctx, next) {
        const { articleId } = ctx.params;
        const [result] = await articleService.getArticleDetailById(articleId);
        const { flag } = ctx.params;
        console.log(flag);
        console.log(result);
        // 2.提供文件信息
        try {
            ctx.response.set('content-type', result.mimetype);
            ctx.response.set('Transfer-Encoding', result.encoding);
            const content = await fs.readFileSync(`${result.filePath}/${result.fileName}`);
            // console.log(content);
            if (flag === 'true') {
                ctx.body = {
                    id: articleId,
                    filename: result.fileName,
                    title: result.title,
                    coverimgUrl: result.coverimgUrl,
                    message: content.toString()
                }
            } else {
                ctx.body = {
                    id: articleId,
                    filename: result.fileName,
                    title: result.title,
                    coverimgUrl: result.coverimgUrl,
                    message: md.render(content.toString())
                }
            }
            // ctx.body = fs.createReadStream(`${result.filePath}/${result.fileName}`);
        } catch (error) {
            console.log(error);
        }
    }
    async saveArticleContent(ctx, next) {
        const { filename, content, title } = ctx.request.body;
        const { id } = ctx.user;
        /**
         * 查看数据库内有没有已经存在该文件
         */
        const result = await articleService.articleExistsByName(filename);
        console.log(result);
        if (result) { //文件已经存在只做修改
            // 文章title做修改
            await articleService.updateTitle(result.id, title);

            const essayPath = path.resolve(result.filePath, filename);
            console.log(essayPath);
            console.log('++++++++++');
            fs.writeFileSync(essayPath, content, { flags: 'w+' })
        } else { //文件不存在创建文件
            //数据库里面增加字段 Date.now()
            const dataNow = Date.now();
            await fileService.saveArticle(title, id, 'text/markdown', ARTICLE_PATH, dataNow + '-' + title + '.md', '7bit');
            //在文件夹里面创建文件，并且输入内容
            const essayPath = path.resolve(ARTICLE_PATH, dataNow + '-' + title + '.md')
            await fs.writeFileSync(essayPath, content, { flags: 'w+' });
        }
        ctx.body = {
            message: '保存成功~'
        }
    }
}

module.exports = new ArticelController();