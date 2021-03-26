const coverService = require('../service/cover.service')
const fs = require('fs');
class CoverController {
    async getCoverImgById(ctx, next) {
        const { coverId } = ctx.params;
        const [result] = await coverService.getCoverImgById(coverId);
        ctx.response.set('content-type', result.mimetype);
        ctx.response.set('Transfer-Encoding', result.encoding);
        ctx.body = fs.createReadStream(`${result.filePath}/${result.fileName}`);
    }
    async getCoverImgList(ctx, next) {
        const result = await coverService.getCoverImgsList();
        ctx.body = result;
    }
}

module.exports = new CoverController();