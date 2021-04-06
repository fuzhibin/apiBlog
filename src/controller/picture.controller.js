const pictureService = require('../service/picture.service')
const fs = require('fs')
class PictureController {
    async getPictureList(ctx, next) {
        const { limit, offset } = ctx.query;
        const result = await pictureService.getPictureList(limit, offset);
        ctx.body = result;
    }

    async getAttachImg(ctx, next) {
        const { attachId } = ctx.params;
        const result = await pictureService.getAttachImg(attachId);
        ctx.response.set('content-type', result.mimetype);
        ctx.body = fs.createReadStream(`${result.filePath}`);
    }
}

module.exports = new PictureController();