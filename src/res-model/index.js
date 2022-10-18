/**
 * base model ,包括 errno， data 和 message
 */
class BaseRes {
    constructor({ errno = -1, data = {}, message = '' }) {
        this.errno = errno
        this.data = data
        this.message = message
    }
}

/**
 * 执行失败的数据模型
 */

class ErrorRes extends BaseRes {
    constructor({ errno = -1, message = '', data }, addMessage = '') {
        super({
            errno,
            message: addMessage ? `${message} - ${addMessage}` : message,
            data,
        })
    }
}

/**
 * 执行成功的数据模型
 */

class SuccessRes extends BaseRes {
    constructor(data = {}) {
        super({
            errno: 0,
            data,
        })
    }
}

module.exports = {
    ErrorRes,
    SuccessRes,
}
