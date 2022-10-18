const router = require('koa-router')()
const { ENV } = require('../utils/env')
const testMySqlConn = require('../db/mysql2')
const { WorkModel } = require('../models/WorkModel')
const { cacheSet, cacheGet } = require('../cache/index')
const loginCheck = require('../middlewares/loginCheck')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json',
    }
})

router.get('/api/db-check', async ctx => {
    // 测试mysql连接
    const mysqlRes = await testMySqlConn()
    // 测试mongo 连接
    let mongodbConn
    let mongodbConnResult
    try {
        mongodbConn = true
        mongodbConnResult = await WorkModel.findOne()
    } catch (e) {
        mongodbConn = false
    }

    // 测试 redis连接

    cacheSet('name', 'editor server OK - by redis')
    const redisTestVal = await cacheGet('name')

    ctx.body = {
        errno: 0,
        data: {
            name: 'test editor server',
            version: require('../../package.json').version,
            ENV,
            mysqlConn: mysqlRes.length > 0,
            mongodbConn,
            redisConn: redisTestVal !== null,
        },
    }
})

module.exports = router
