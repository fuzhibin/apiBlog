const connection = require('../app/database')

class CoverService {
    async getCoverImgById(id) {
        const statement = `SELECT * FROM coverimg WHERE id = ? ;`;
        const [result] = await connection.execute(statement, [id]);
        return result;
    }
    async getCoverImgsList() {
        const statement = `SELECT id,fileName,CONCAT('http://localhost:8000/cover/',id) imgUrl,encoding,size FROM coverimg;`;
        const [result] = await connection.execute(statement);
        return result;
    }
    async saveArticleAndCover(articleId, coverimgId) {
        const statement = `INSERT INTO article_cover(article_id,coverimg_id) VALUES(?,?);`;
        const [result] = await connection.execute(statement, [articleId, coverimgId]);
        return result;
    }
}

module.exports = new CoverService();