const seq = require('../db/seq/seq')
const { STRING, DATE, BOOLEAN } = require('../db/seq/types')

const User = seq.define('user', {
    username: {
        type: STRING,
        allowNull: false,
        unique: 'username', // 不要用 unique: true,
        comment: '用户名，唯一',
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码',
    },
})

module.exports = User
