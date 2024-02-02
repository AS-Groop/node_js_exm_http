const http = require('http')
const EventEmitter = require('events')
const path = require("path");
module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this.#createServer()
        this.middlewares = []
    }

    listen(PORT, callback) {
        this.server.listen(PORT, callback)
    }

    use(middleware){
        this.middlewares.push(middleware)
    }

    addRouter(router){
        Object.keys(router).forEach(path=>{
            const endpoint = router[path]
            Object.keys(endpoint).forEach(method=>{
                const handler = endpoint[method]
                this.emitter.on(this.#getEventName(path,method), (req, res)=>{
                    handler(req, res)
                })
            })
        })
    }

    #createServer() {
        return http.createServer((req, res)=>{
            let body = ''
            req.on('data', (chunk)=>{
                body+=chunk
            })
            req.on('end', ()=>{
                if (body) {
                    req.body = JSON.parse(body)
                }
                this.middlewares.forEach(middleware => middleware(req, res))
                const emit = this.emitter.emit(this.#getEventName(req.pathname, req.method), req, res)
                if(!emit) {
                    res.end()
                }
            })

        })
    }

    #getEventName(path, method) {
        return `[${path}]:[${method}]`
    }

}