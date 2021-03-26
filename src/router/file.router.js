const Router = require('koa-router');

const {
    verifyAuth
} = require('../middleware/permission.middleware');

const fileRouter = new Router({ prefix: '/upload' });

const {
    articleUpload,
    coverImgsUpload
} = require('../middleware/file.middleware');

const {
    saveArticle,
    saveCoverPic
} = require('../controller/file.controller')

fileRouter.post('/article', verifyAuth, articleUpload.single('file'), saveArticle);
fileRouter.post('/coverPic', verifyAuth, coverImgsUpload.single('coverImg'), saveCoverPic);


module.exports = fileRouter;