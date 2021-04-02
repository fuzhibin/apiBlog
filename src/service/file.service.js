const connection = require('../app/database');

class FileService {
    async saveArticle(title, authorId, mimetype, filePath, filename, encoding) {
        const statement = `INSERT INTO articles(title,author_id,mimeType,filePath,fileName,encoding)  VALUES(?,?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [title, authorId, mimetype, filePath, filename, encoding]);
        return result;
    }
    async saveCoverPic(mimetype, filePath, size, filename, encoding) {
        const statement = `INSERT INTO coverimg(mimetype, filePath, size, fileName, encoding) VALUES(?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [mimetype, filePath, size, filename, encoding]);
        return result;
    }
    async saveAvatar(id, avatarPath, mimetype) {
        const statement = `UPDATE user SET avatar = ?,mimetype=? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [avatarPath, mimetype, id]);
        return result;
    }
    async saveAttach(attachPath, mimetype) {
        const statement = `INSERT INTO attachimg(filePath,mimetype) VALUES(?,?);`;
        const [result] = await connection.execute(statement, [attachPath, mimetype]);
        return result;
    }
}
module.exports = new FileService();