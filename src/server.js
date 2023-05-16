const https = require('https')
const app = require('./app')
const port = process.env.PORT || 3000
const server = https.createServer(app)

server.listen(port, () => {
    console.log(`\nServer running in port ${port}.\n`)
})