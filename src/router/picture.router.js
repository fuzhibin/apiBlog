const Router = require('koa-router');

const PictureRouter = new Router({ prefix: '/picture' });

const {
    getPictureList,
    getAttachImg
} = require('../controller/picture.controller')

PictureRouter.get('/', getPictureList)

/***
 * 获取文章配图
 */

PictureRouter.get('/:attachId', getAttachImg);
module.exports = PictureRouter