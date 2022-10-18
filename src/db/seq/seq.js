const { Sequelize }  = require('sequelize')
const {mysqlConf} = require('../../config/index')
const {isPrd, isTest} = require('../../utils/env')

const {database,user,password, host,port} = mysqlConf

const conf = {
    host,
    port,
    dialect: 'mysql'
}

// 测试环境不打印日志，改写logging方法

if(isTest)
{
    conf.logging = f=>f;
}

if(isPrd) {
    conf.pool = {
        max:5, // 连接池中最大连接数量
        min:0, // 连接池中最小连接数量
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
}

// 创建连接

const seq = new Sequelize(database, user, password, conf)

 module.exports = seq

// async function test(){
//     try {
//         await seq.authenticate();
//         console.log('Connection has been established successfully.');
//         await seq.close()
//         console.log('close')
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
//
// test()