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
                    labels: result.labels,
                    coverimgUrl: result.coverimgUrl,
                    message: content.toString()
                }
            } else {
                ctx.body = {
                    id: articleId,
                    filename: result.fileName,
                    title: result.title,
                    labels: result.labels,
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
            let articleId = null;
            if (result) { //文件已经存在只做修改
                // 文章title做修改
                await articleService.updateTitle(result.id, title);
                const essayPath = path.resolve(result.filePath, filename);
                articleId = result.id;
                fs.writeFileSync(essayPath, content, { flags: 'w+' })
            } else { //文件不存在创建文件
                //数据库里面增加字段 Date.now()
                const dataNow = Date.now();
                const result = await fileService.saveArticle(title, id, 'text/markdown', ARTICLE_PATH, dataNow + '-' + title + '.md', '7bit');
                articleId = result.insertId;
                //在文件夹里面创建文件，并且输入内容
                const essayPath = path.resolve(ARTICLE_PATH, dataNow + '-' + title + '.md')
                await fs.writeFileSync(essayPath, content, { flags: 'w+' });
            }
            ctx.body = {
                articleId,
                message: '保存成功~'
            }
        }
        /**
         * 文章删除功能
         */
    async deleteArticle(ctx, next) {
        const { articleId } = ctx.params;
        //查询要删除文件的信息
        const [result] = await articleService.getArticleDetailById(articleId);
        //除去数据库里的记录
        await articleService.deleteArticle(articleId);
        //删除存储下来的文件 
        const fileAddress = path.join(result.filePath, result.fileName);
        fs.unlinkSync(fileAddress);
        ctx.body = {
            flag: true,
            message: '删除成功~'
        };
    }
}

module.exports = new ArticelController();