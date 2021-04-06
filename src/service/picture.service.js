const connection = require('../app/database');

class PictureService {
    async getPictureList(limit, offset) {
        const statement = `SELECT * FROM picture LIMIT ?,?;`;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
    async getAttachImg(attachId) {
        const statement = `SELECT * FROM attachimg WHERE id = ?;`;
        const [result] = await connection.execute(statement, [attachId]);
        return result[0];
    }
}

module.exports = new PictureService()