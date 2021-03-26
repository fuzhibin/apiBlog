const multer = require('koa-multer');


const {
    ARTICLE_PATH,
    COVERPIC_PATH
} = require('../constants/file-path');
/**
 * articleStorage 文章保存路径 
 * coverImgStorage 文章封面保存路径
 */
const articleStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, ARTICLE_PATH);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.toString('utf8')}`);
    }
});

const coverImgStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, COVERPIC_PATH);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.toString('utf8')}`);
    }
})
const articleUpload = multer({ storage: articleStorage });
const coverImgsUpload = multer({ storage: coverImgStorage })


module.exports = {
    articleUpload,
    coverImgsUpload
}