const connection = require('../app/database');
const {
    APP_PATH,
    APP_PORT
} = require('../app/config')
class UserService {
    async create(username, password, avatarPath) {
        const statement = `INSERT INTO user(name,password,avatar) VALUES(?,?,?);`;
        const [result] = await connection.execute(statement, [username, password, avatarPath]);
        return result;
    }
    async getUserInfo(id) {
        const statement = `
        SELECT 
        name,CONCAT('${APP_PATH}:${APP_PORT}/user/',user.id,'/avatar') avatar,
        (SELECT COUNT(*) FROM articles WHERE articles.author_id = user.id) article_num
        FROM user 
        WHERE user.id =? ;
        `;
        const [result] = await connection.execute(statement, [id]);
        return result[0];
    }
    async getUserDeatilInfo(id) {
        const statement = `SELECT *,CONCAT('${APP_PATH}:${APP_PORT}/user/',id,'/avatar') avatarUrl FROM user WHERE id = ? ;`;
        const [result] = await connection.execute(statement, [id]);
        return result[0];
    }
    async updataUserInfo(id, age, email, name) {
            const statement = `UPDATE user SET name=?,email=?,age =? WHERE id  =?;`;
            const [result] = await connection.execute(statement, [name, email, age, id]);
            return result;
        }
        /**
         * 查询用户的头像
         */
    async findUserAvatar(id) {
        const statement = `SELECT id,avatar,CONCAT('${APP_PATH}:${APP_PORT}/user/',id,'/avatar') avatarUrl FROM user WHERE id = ?;`;
        const [result] = await connection.execute(statement, [id]);
        return result[0];
    }
    async deleteUser(id) {
        const statement = `DELETE FROM user WHERE id = ?;`;
        const [result] = await connection.execute(statement, [id]);
        return result;
    }
}

module.exports = new UserService();