const Router = require('koa-router');

const userRouter = new Router({ prefix: '/user' });

const {
    verifyReg
} = require('../middleware/user.middleware')

const {
    create
} = require('../controller/user.controller')

userRouter.post('/register', verifyReg, create);

module.exports = userRouter;