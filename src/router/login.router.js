const Router = require('koa-router');

const {
    verifyLogin
} = require('../middleware/login.middleware')

const {
    login
} = require('../controller/login.controller')
const LoginRouter = new Router({ prefix: '/login' });


LoginRouter.post('/', verifyLogin, login)
module.exports = LoginRouter