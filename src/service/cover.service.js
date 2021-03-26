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
}

module.exports = new CoverService();