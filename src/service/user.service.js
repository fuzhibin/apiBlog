const connection = require('../app/database');

class UserService {
    async create(username, password) {
        const statement = `INSERT INTO user(name,password) VALUES(?,?);`;
        const [result] = await connection.execute(statement, [username, password]);
        return result;
    }
    async getUserInfo(id) {
        const statement = `
        SELECT 
        name,CONCAT('http://localhost:8000/user/',id,'/avatar') avatar, 
        (SELECT COUNT(*) FROM articles WHERE articles.author_id = user.id) article_num
        FROM user 
        WHERE id =? ;
        `;
        const [result] = await connection.execute(statement, [id]);
        return result[0];
    }
}

module.exports = new UserService();