const jwt = require('jsonwebtoken');
const {
    PUBLIC_KEY
} = require('../app/config')

const {
    USER_IS_NOT_LOGIN,
    TOKEN_IS_NOT_VALUE
} = require('../constants/error-type')

const verifyAuth = async(ctx, next) => {
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        const error = new Error(USER_IS_NOT_LOGIN);
        return ctx.app.emit('error', error, ctx);
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        ctx.user = result;
        await next();
    } catch (err) {
        const error = new Error(TOKEN_IS_NOT_VALUE);
        console.log(err);
        return ctx.app.emit('error', error, ctx);
    }

}

module.exports = {
    verifyAuth
}