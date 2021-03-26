/**
 * 文章封面路由
 */
const Router = require('koa-router');
const coverRouter = new Router({ prefix: '/cover' });

const {
    getCoverImgById,
    getCoverImgList
} = require('../controller/cover.controller')
coverRouter.get('/list', getCoverImgList);

/**
 * 获取单个文章封面图片
 */
coverRouter.get('/:coverId', getCoverImgById);
/**
 * 获取全部文章封面图片路径
 */

module.exports = coverRouter;