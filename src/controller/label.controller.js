const labelService = require('../service/label.service')

class LabelController {
    async create(ctx, next) {
        const { labels } = ctx.request.body;
        const { articleId } = ctx.params;
        labels.forEach(async label => {
            const [result] = await labelService.getLabelByName(label);
            console.log(result);
            if (!result) { //标签不存在
                const addResult = await labelService.addLabel(label);
                // console.log(addResult, addResult.insertId);
                await labelService.create(articleId, addResult.insertId);
            } else {
                await labelService.create(articleId, result.id);
            }
        });
        ctx.body = {
            status: 200,
            message: "标签提交成功~"
        }
    }
}

module.exports = new LabelController();