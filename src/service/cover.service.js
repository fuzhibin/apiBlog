const connection = require('../app/database')
const {
    APP_PATH,
    APP_PORT
} = require('../app/config')
class CoverService {
    async getCoverImgById(id) {
        const statement = `SELECT * FROM coverimg WHERE id = ? ;`;
        const [result] = await connection.execute(statement, [id]);
        return result;
    }
    async getCoverImgsList() {
            const statement = `SELECT id,fileName,CONCAT('${APP_PATH}:${APP_PORT}/cover/',id) imgUrl,encoding,size FROM coverimg;`;
            const [result] = await connection.execute(statement);
            return result;
        }
        //不存在
    async saveArticleAndCover(articleId, coverimgId) {
            const statement = `INSERT INTO article_cover(article_id,coverimg_id) VALUES(?,?);`;;
            const [result] = await connection.execute(statement, [articleId, coverimgId, ]);
            return result;
        }
        //存在
    async updateArticleAndCover(articleId, coverimgId) {
        const statement = `UPDATE article_cover SET coverimg_id =? WHERE article_id= ?;`;
        const [result] = await connection.execute(statement, [coverimgId, articleId, ]);
        return result;
    }
    async getExistsCoverImg(articleId) {
        const statement = `SELECT * FROM article_cover WHERE article_id= ?;`;
        const [result] = await connection.execute(statement, [articleId]);
        return result[0]
    }
    async deleteCoverimgById(id) {
        const statement = `DELETE FROM coverimg WHERE id = ?;`;
        const [result] = await connection.execute(statement, [id]);
        return result;
    }
}

module.exports = new CoverService();