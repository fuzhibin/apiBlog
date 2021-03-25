const md5Password = require('../utils/password-handle')

const userService = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        const { username, password } = ctx.request.body;
        const result = await userService.create(username, md5Password(password));
        ctx.body = result;
    }
}

module.exports = new UserController();