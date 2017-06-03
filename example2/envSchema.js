const envalid = require('..')

module.exports = {
    HOST:       envalid.str({ default: '127.0.0.1' }),
    PORT:       envalid.num({
        default: 3000,
        desc: 'The port to start the server on',
        doc: 'http://example.com/docs',
        choices: [3000, 4000],
        example: '3000',
    }),

    // For this example, the MESSAGE env var will be read from the .env
    // file in this directory (so the default value won't be used):
    MESSAGE:    envalid.str({ default: 'Hello, world' })
}
