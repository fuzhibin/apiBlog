const Router = require('koa-router');

const articleRouter = new Router({ prefix: '/article' });

const {
    getArticleList,
    getArticleDetailById
} = require('../controller/article.controller');
/**
 * 文章列表请求
 */
articleRouter.get('/list', getArticleList);
/**
 * 文章详情
 *  /article/:articleId
 */
articleRouter.get('/:articleId', getArticleDetailById);



module.exports = articleRouter;