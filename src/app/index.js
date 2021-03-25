/**
 * 模块引入
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

/**
 * 文件引入
 */
const error_handle = require('./error-handle');
const useRoutes = require('../router/index');
const cross_handle = require('./cros-handle')

const app = new Koa();

app.use(cross_handle);
app.use(bodyParser());
useRoutes(app);
app.on("error", error_handle)
module.exports = app;