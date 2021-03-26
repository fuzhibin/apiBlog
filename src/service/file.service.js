const connection = require('../app/database');

class FileService {
    async saveArticle(title, authorId, mimetype, filePath, filename, size, encoding) {
        const statement = `INSERT INTO articles(title,author_id,mimeType,filePath,size,fileName,encoding)  VALUES(?,?,?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [title, authorId, mimetype, filePath, size, filename, encoding]);
        return result;
    }
    async saveCoverPic(mimetype, filePath, size, filename, encoding) {
        const statement = `INSERT INTO coverimg(mimetype, filePath, size, fileName, encoding) VALUES(?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [mimetype, filePath, size, filename, encoding]);
        return result;
    }
}
module.exports = new FileService();