module.exports = {
    // mysql 连接配置
    mysqlConf: {
        host: '101.43.2.58',
        user: 'alex_ruan',
        password: 'Alex_13306',
        port: '3306',
        database: 'lego_course',
    },
    mongodbConf: {
        host: '101.43.2.58',
        user: 'admin',
        password: 'Alex_123',
        port: '27017',
        dbName: 'lego',
    },
    // redis 连接配置
    redisConf: {
        port: '6379',
        host: '101.43.2.58',
        username: 'requirepass',
        password: 'Alex_123',
    },

    // jwt 过期时间
    jwtExpiresIn: '1d', // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s
}
