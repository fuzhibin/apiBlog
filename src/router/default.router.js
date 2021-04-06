const Router = require('koa-router');
const {
    getDefaultAvatar
} = require('../controller/default.controller')
const defaultRouter = new Router({ prefix: '/default' });

defaultRouter.get('/avatar', getDefaultAvatar)

module.exports = defaultRouter;