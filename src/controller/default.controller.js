const fs = require('fs');
const mime = require('mime-types')
const {
    DEFAULT_AVATAR_PATH
} = require('../constants/file-path')

class DefaultController {
    async getDefaultAvatar(ctx, next) {
        let mimeType = mime.lookup(DEFAULT_AVATAR_PATH);
        ctx.response.set('content-type', mimeType);
        ctx.body = fs.createReadStream(DEFAULT_AVATAR_PATH);
    }
}

module.exports = new DefaultController();