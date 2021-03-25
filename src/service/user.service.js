const connection = require('../app/database');

class UserService {
    async create(username, password) {
        const statement = `INSERT INTO user(name,password) VALUES(?,?);`;
        const [result] = await connection.execute(statement, [username, password]);
        return result;
    }
}

module.exports = new UserService();