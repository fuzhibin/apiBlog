const Router = require('koa-router');
const {
    verifyAuth
} = require('../middleware/permission.middleware')
const {
    create
} = require('../controller/label.controller')
const labelRouter = new Router({ prefix: '/label' });

labelRouter.post('/:articleId', verifyAuth, create);


module.exports = labelRouter;