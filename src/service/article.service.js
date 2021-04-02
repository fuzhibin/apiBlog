const connection = require('../app/database')
class ArticleService {
    async getArticlesList(limit, offset) {
        const statement = `
        SELECT *,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',label.id,'label',label.name)) 
        FROM article_label LEFT JOIN label ON label.id = article_label.label_id  WHERE article_label.article_id=articles.id) labels,
        (SELECT CONCAT('http://localhost:8000/cover/',article_cover.coverimg_id) FROM article_cover LEFT JOIN coverimg ON article_cover.article_id = coverimg.id 
        WHERE articles.id = article_cover.article_id) coverimgUrl
        FROM articles  LIMIT ? ,?;
        `;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
    async getArticleDetailById(articleId) {
        const statement = `
        SELECT *,(SELECT CONCAT('http://localhost:8000/cover/',article_cover.coverimg_id) FROM article_cover WHERE article_cover.article_id= articles.id) coverimgUrl
        FROM articles WHERE id = ?;`;
        const [result] = await connection.execute(statement, [articleId]);
        return result;
    }
    async getUserArticles(id, limit, offset) {
        const statement = `SELECT *,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',label.id,'label',label.name)) 
        FROM article_label LEFT JOIN label ON label.id = article_label.label_id  WHERE article_label.article_id=articles.id) labels,
        (SELECT CONCAT('http://localhost:8000/cover/',article_cover.coverimg_id) FROM article_cover LEFT JOIN coverimg ON article_cover.article_id = coverimg.id 
        WHERE articles.id = article_cover.article_id) coverimgUrl
        FROM articles WHERE articles.author_id=? LIMIT ? ,?;`;
        const [result] = await connection.execute(statement, [id, offset, limit]);
        return result;
    }
    async getUserAvatar(userId) {
        const statement = `SELECT * FROM user WHERE id = ?;`;
        const [result] = await connection.execute(statement, [userId]);
        return result[0];
    }
    async articleExistsByName(filename) {
        const statement = `SELECT * FROM articles WHERE fileName = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
    async updateTitle(id, title) {
        const statement = `UPDATE articles SET title =? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [title, id]);
        return result;
    }
}

module.exports = new ArticleService();