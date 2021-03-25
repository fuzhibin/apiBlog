const mysql = require('mysql2');

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_CONNECTIONLIMMIT
} = require('./config')

const connection = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    connectionLimit: MYSQL_CONNECTIONLIMMIT
});

connection.getConnection((err, con) => {
    con.connect((err) => {
        if (err) {
            console.log("连接失败:", err);
        } else {
            console.log("数据库连接成功~");
        }
    })
})
module.exports = connection.promise();