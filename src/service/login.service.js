const connection = require('../app/database');

class LoginService {
    async getUserInfoByName(username) {
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const [result] = await connection.execute(statement, [username]);
        return result;
    }
}

module.exports = new LoginService();