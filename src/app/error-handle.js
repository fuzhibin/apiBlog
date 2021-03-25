const {
    USERNAME_OR_PASSWORD_IS_NULL,
    USERNAME_IS_NOT_EXISTS,
    PASSWORD_IS_NOT_CORRECT,
    USERNAME_IS_EXISTS
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

    }
    ctx.status = status;
    ctx.body = message;
}


module.exports = error_handle;