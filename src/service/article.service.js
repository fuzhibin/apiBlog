const connection = require('../app/database')
class ArticleService {
    async getArticlesList(limit, offset) {
        const statement = `
        SELECT *,CONCAT('http://localhost:8000',filePath,fileName) fileUrl,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',label.id,'label',label.name)) 
        FROM article_label LEFT JOIN label ON label.id = article_label.label_id WHERE article_label.article_id=articles.id) labels
        FROM articles  LIMIT ?,?;
        `;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
    async getArticleDetailById(articleId) {
        const statement = `SELECT * FROM articles WHERE id = ?;`;
        const [result] = await connection.execute(statement, [articleId]);
        return result;
    }
}

module.exports = new ArticleService();