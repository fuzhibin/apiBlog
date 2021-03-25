const {
    USERNAME_OR_PASSWORD_IS_NULL,
    USERNAME_IS_EXISTS
} = require('../constants/error-type');
const loginService = require('../service/login.service')

const verifyReg = async(ctx, next) => {
    const { username, password } = ctx.request.body;
    //判断用户是否输入用户名和密码
    if (!username || !password) {
        const error = new Error(USERNAME_OR_PASSWORD_IS_NULL);
        return ctx.app.emit("error", error, ctx);
    }
    //判断用户名是否存在
    const result = await loginService.getUserInfoByName(username)[0];
    if (result) {
        const error = new Error(USERNAME_IS_EXISTS);
        return ctx.app.emit("error", error, ctx);
    }
    await next();

}

module.exports = {
    verifyReg
}