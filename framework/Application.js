const http = require('http')
const EventEmitter = require('events')
const path = require("path");
module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this.#createServer()
        this.middlewares = []
    }
    listen(port, callback) {
        this.server.listen(port, callback)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    addRouter(endpoints) {
        Object.keys(endpoints).forEach(path=> {
            const endpoint = endpoints[path]
            Object.keys(endpoint).forEach(method=> {
                const handler = endpoint[method]
                this.emitter.on(this.#getRouterName(path, method), (req, res)=>{
                    handler(req, res)
                })
            })
        })
    }

    #createServer() {
        return http.createServer((req, res)=>{
            let body = ''
            req.on('data', (chunk)=>{
                body += chunk
            })
            req.on('end', ()=>{
                if (body) {
                    req.body = JSON.parse(body)
                }
                this.middlewares.forEach(middleware=>middleware(req, res))
                const endpoint = this.emitter.emit(this.#getRouterName(req.pathname, req.method), req, res)
                if(!endpoint) res.end('NOT FOUND')
            })
        })
    }

    #getRouterName(path, method){
        return `[${path}]:[${method}]`
    }
}