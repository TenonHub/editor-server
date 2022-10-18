const {isPrd, isPrdDev} = require('../utils/env')

let fileName = 'dev.js'
if(isPrdDev)fileName = 'prd-dev.js'
if(isPrd)fileName = 'prd.js'

const conf = require(`./envs/${fileName}`)

module.exports = conf
