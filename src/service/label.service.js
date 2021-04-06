const connection = require('../app/database')

class LabelService {
    async getLabelByName(name) {
        const statement = `SELECT * FROM label WHERE name = ?;`;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }
    async addLabel(name) {
        const statement = `INSERT INTO label(name) VALUES (?);`;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }
    async create(articleId, labelId) {
        const statement = `INSERT INTO article_label(article_id,label_id) VALUES(?,?);`;
        const [result] = await connection.execute(statement, [articleId, labelId]);
        return result;
    }
    async deleteLabels(articleId) {
        const statement = `DELETE FROM article_label WHERE article_id = ?;`;
        const [result] = await connection.execute(statement, [articleId]);
        return result;
    }
}

module.exports = new LabelService();