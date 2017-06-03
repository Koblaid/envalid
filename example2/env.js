const envalid = require('..')

const envVariables = require('./envVariables')

module.exports = envalid.cleanEnv(process.env, envVariables)
