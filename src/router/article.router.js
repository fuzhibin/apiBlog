const Router = require('koa-router');

const articleRouter = new Router({ prefix: '/article' });
const {
    verifyAuth
} = require('../middleware/permission.middleware')
const {
    getArticleList,
    getArticleDetailById,
    saveArticleContent
} = require('../controller/article.controller');
/**
 * 全部文章列表请求
 */
articleRouter.get('/list', getArticleList);
/**
 * 文章详情
 *  /article/:articleId/:flag
 * flag = true 返回不需要解码的文章
 * flag = false 返回不需要解码的文章
 * 
 */
articleRouter.get('/:articleId/:flag', getArticleDetailById);
articleRouter.post('/content', verifyAuth, saveArticleContent)


module.exports = articleRouter;