const Router = require('koa-router');

const userRouter = new Router({ prefix: '/user' });

const {
    verifyReg
} = require('../middleware/user.middleware')
const {
    verifyAuth
} = require('../middleware/permission.middleware')
const {
    create,
    getUserArticle,
    getUserAvatar,
    getUserInfo,
    getUserDeatilInfo,
    updataUserInfo,
    deleteUserAll
} = require('../controller/user.controller')

userRouter.post('/register', verifyReg, create);
/**
 * 获取对应用户的文章列表
 */
userRouter.get('/list', verifyAuth, getUserArticle);
userRouter.get('/:userId/avatar', getUserAvatar);
/***
 * profile界面展示小部分用户信息
 */
userRouter.get('/', verifyAuth, getUserInfo);
/**
 * 获取详细信息
 */
userRouter.get('/detail', verifyAuth, getUserDeatilInfo);
/**
 * 修改我的信息
 */
userRouter.post('/', verifyAuth, updataUserInfo);
/**
 * 注销用户信息
 */
userRouter.delete('/logout', verifyAuth, deleteUserAll)
module.exports = userRouter;