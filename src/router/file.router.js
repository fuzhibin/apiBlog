const Router = require('koa-router');

const {
    verifyAuth
} = require('../middleware/permission.middleware');

const fileRouter = new Router({ prefix: '/upload' });

const {
    articleUpload,
    coverImgsUpload,
    avatarUpload,
    attachUpload
} = require('../middleware/file.middleware');

const {
    saveArticle,
    saveCoverPic,
    saveAvatar,
    saveAttache
} = require('../controller/file.controller')

fileRouter.post('/article', verifyAuth, articleUpload.single('file'), saveArticle);
fileRouter.post('/coverPic', verifyAuth, coverImgsUpload.single('coverImg'), saveCoverPic);
fileRouter.post('/avatar', verifyAuth, avatarUpload.single('avatar'), saveAvatar);
/**
 * 文章内图片截图
 */
fileRouter.post('/attachPic', verifyAuth, attachUpload.single('attachImg'), saveAttache)


module.exports = fileRouter;