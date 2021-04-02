const multer = require('koa-multer');


const {
    ARTICLE_PATH,
    COVERPIC_PATH,
    AVATAR_PATH,
    ATTACHE_PATH
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
});

const avatarStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, AVATAR_PATH);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.toString('utf8')}`);
    }
});
const attachStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, ATTACHE_PATH);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.toString('utf8')}`);
    }
})
const articleUpload = multer({ storage: articleStorage });
const coverImgsUpload = multer({ storage: coverImgStorage })
const avatarUpload = multer({ storage: avatarStorage })
const attachUpload = multer({ storage: attachStorage })
module.exports = {
    articleUpload,
    coverImgsUpload,
    avatarUpload,
    attachUpload
}