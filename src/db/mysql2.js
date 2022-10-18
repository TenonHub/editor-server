const mysql = require('mysql2/promise')
const {mysqlConf} = require('../config/index')

async function testMySqlConn(){
    const connection = await mysql.createConnection(mysqlConf)
    const [rows] = await connection.execute('select now();')
    return rows
}


module.exports = testMySqlConn