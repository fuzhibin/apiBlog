const {
    USERNAME_OR_PASSWORD_IS_NULL,
    USERNAME_IS_NOT_EXISTS,
    PASSWORD_IS_NOT_CORRECT,
    USERNAME_IS_EXISTS,
    USER_IS_NOT_LOGIN,
    TOKEN_IS_NOT_VALUE
} = require('../constants/error-type')

const error_handle = (err, ctx) => {
    let message;
    let status = 200;
    switch (err.message) {
        case USERNAME_OR_PASSWORD_IS_NULL:
            message = '账号或者密码为空~';
            status = 404;
            break;
        case USERNAME_IS_NOT_EXISTS:
            message = '用户名不存在~';
            status = 404;
            break;
        case PASSWORD_IS_NOT_CORRECT:
            message = '用户名或者密码不正确~';
            status = 404;
            break;
        case USERNAME_IS_EXISTS:
            message = '用户名已经存在了~';
            status = 404;
            break;
        case USER_IS_NOT_LOGIN:
            message = '用户您还未登陆~';
            status = 404;
            break;
        case TOKEN_IS_NOT_VALUE:
            message = "存在无效的token，请重新登陆~";
            status = 404;
            break;

    }
    ctx.status = status;
    ctx.body = message;
}


module.exports = error_handle;