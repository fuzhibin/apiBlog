const connection = require('../app/database');
const {
    APP_PATH,
    APP_PORT
} = require('../app/config')
class ArticleService {
    async getArticlesList(limit, offset) {
        const statement = `
        SELECT *,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',label.id,'label',label.name)) 
        FROM article_label LEFT JOIN label ON label.id = article_label.label_id  WHERE article_label.article_id=articles.id) labels,
        (SELECT CONCAT('${APP_PATH}:${APP_PORT}/cover/',article_cover.coverimg_id) FROM article_cover LEFT JOIN coverimg ON article_cover.article_id = coverimg.id 
        WHERE articles.id = article_cover.article_id) coverimgUrl
        FROM articles  LIMIT ? ,?;
        `;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
    async getArticleDetailById(articleId) {
        const statement = `
        SELECT *,(SELECT CONCAT('${APP_PATH}:${APP_PORT}/cover/',article_cover.coverimg_id) FROM article_cover WHERE article_cover.article_id= articles.id) coverimgUrl,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',label.id,'label',label.name)) 
                FROM article_label LEFT JOIN label ON label.id = article_label.label_id  WHERE article_label.article_id=articles.id) labels
        FROM articles WHERE id = ?;`;
        const [result] = await connection.execute(statement, [articleId]);
        return result;
    }
    async getUserArticles(id, limit, offset) {
        const statement = `SELECT *,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',label.id,'label',label.name)) 
        FROM article_label LEFT JOIN label ON label.id = article_label.label_id  WHERE article_label.article_id=articles.id) labels,
        (SELECT CONCAT('${APP_PATH}:${APP_PORT}/cover/',article_cover.coverimg_id) FROM article_cover LEFT JOIN coverimg ON article_cover.article_id = coverimg.id 
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
    async deleteArticle(id) {
        const statement = `DELETE FROM articles WHERE id = ?;`;
        const [result] = await connection.execute(statement, [id]);
        return result;
    }
    async getUserAllArticles(id) {
        const statement = `
        select *,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT(''coverId',coverimg.id,'filePath',coverimg.filePath,'fileName',fileName)) from article_cover LEFT JOIN coverimg ON article_cover.coverimg_id = coverimg.id WHERE article_cover.article_id = articles.id) covers
        from articles where articles.author_id = ?; `;
        const [result] = await connection.execute(statement, [id]);
        return result;
    }
}

module.exports = new ArticleService();