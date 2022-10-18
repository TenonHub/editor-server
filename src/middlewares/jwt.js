const jwtKoa = require('koa-jwt')
const { JWT_SECRET, JWT_IGNORE_PATH } = require('../config/constant')

module.exports = jwtKoa({
    secret: JWT_SECRET,
    cookie: 'jwt_token', // 使用cookie 存储token
}).unless({
    // 定义哪些路由忽略jwt验证
    path: JWT_IGNORE_PATH,
})
