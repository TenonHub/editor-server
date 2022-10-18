const path = require('path')
const simpleGit = require('simple-git')
const seq = require('../seq')
const { isDev } = require('../../../utils/env')

require('require-all')({
    dirname: path.resolve('src', 'models'),
    filter: /\.js$/,
    excludeDirs: /^\.(git|svn)$/,
    recursive: true, // 递归
})

// 同步数据表

async function syncDB() {
    let needToSyncDb = true
    if (isDev) {
        // 开发环境下，修改频繁，每次重启都同步数据表，消耗太大
        // 所以，开发环境下，判断是否修改了 src/models 中的内容？
        // 如果是，则同步数据表。否则，不用同步数据表。

        const git = simpleGit()
        // 获取 git status 修改的文件，modified 格式如  [ '.gitignore', 'package.json', 'src/models/README.md' ]
        const { modified, not_added: nodeAdded, created, deleted, renamed } = await git.status()
        const fileChanged = modified
            .concat(nodeAdded)
            .concat(created)
            .concat(deleted)
            .concat(renamed)

        if (fileChanged.length) {
            // 说明 git status 有改动

            const changeDbFiles = fileChanged.some(f => {
                // 改动了 src/models 需要同步数据库
                if (f.indexOf('src/models/') === 0) {
                    return true
                }
                return f.indexOf('src/db/seq') === 0
            })
            // 没改动 db 文件，则不需要同步
            if (!changeDbFiles) needToSyncDb = false
        }

        if (needToSyncDb) {
            await seq.sync({ alter: true })
        }
    }
}

module.exports = syncDB
