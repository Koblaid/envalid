#!/usr/bin/env node
/*
TODO:
- improve error message when the envSchema file could not be loaded
- test if the script can be executed directly (not using npm)
- argument to set the output filename
- existing files should not be overwritten by default. instead add a flag to overwrite existing files
- try to join multiple commented lines into one line if it doesn't exceed 80 characters
- add a new config option: "section". This is used to group env file entries which belong together. Example output:
This schema:
{
    DB_HOST:       envalid.str({ section: 'Database' }),
    DB_PORT:       envalid.str({ section: 'Database' }),
    DB_USER:       envalid.str({ section: 'Database' }),
    DB_PASSWORD:   envalid.str({ section: 'Database' }),
    PORT:          envalid.str({ section: 'Server' }),
    DOMAIN:        envalid.str({ section: 'Server' }),
    USE_HTTPS:     envalid.str({ section: 'Server' }),
}

Would result in this file:
############# Database #################
DB_HOST=

DB_PORT=

DB_USER=

DB_PASSWORD=

############# Server ###################
PORT=

DOMAIN=

USE_HTTPS=
...


*/

const process = require('process')
const path = require('path')
const fs = require('fs')


let envSchema
const envSchemaFilepath = path.join(process.cwd(), process.argv[2])

try {
    envSchema = require(envSchemaFilepath)
} catch (e) {
    console.log(`Error while trying to require ${envSchemaFilepath}`)
    console.error(e)
    process.exit(1)
}


const envFileContent = Object.keys(envSchema).map((variableName) => {
    const config = envSchema[variableName]

    let text = ''

    if (config.desc) {
        text += `# ${config.desc}\n`
    }

    if (config.doc) {
        text += `# See also ${config.doc}\n`
    }

    if (config.choices) {
        text += `# Allowed values: [${config.choices.join('|')}]\n`
    }

    if (config.example) {
        text += `# Example: ${config.example}\n`
    }

    text += `${variableName}=`
    text += config.devDefault || config.default || ''
    text += '\n'
    return text
}).join('\n')

fs.writeFileSync('.env', envFileContent, 'utf-8')
