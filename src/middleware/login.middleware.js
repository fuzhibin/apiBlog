const md5Password = require('../utils/password-handle')

const {
    USERNAME_OR_PASSWORD_IS_NULL,
    USERNAME_IS_NOT_EXISTS,
    PASSWORD_IS_NOT_CORRECT
} = require('../constants/error-type')
const loginService = require('../service/login.service');

const verifyLogin = async(ctx, next) => {
    const { username, password } = ctx.request.body;
    //判断用户是否输入用户名和密码
    if (!username || !password) {
        const error = new Error(USERNAME_OR_PASSWORD_IS_NULL);
        return ctx.app.emit("error", error, ctx);
    }
    //判断用户名是否存在
    const [result] = await loginService.getUserInfoByName(username);
    if (!result) {
        const error = new Error(USERNAME_IS_NOT_EXISTS);
        return ctx.app.emit("error", error, ctx);
    }
    if (result.password != md5Password(password)) {
        const error = new Error(PASSWORD_IS_NOT_CORRECT);
        return ctx.app.emit('error', error, ctx);
    }
    ctx.user = result;
    await next();

}

module.exports = {
    verifyLogin
}