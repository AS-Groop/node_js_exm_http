const Application = require('./framework/Application')
const router = require('./src/user-router.js')
const parseJson = require('./framework/parseJson')
const parseUrl = require('./framework/parseUrl')

const PORT = process.env.PORT || 5000

const app = new Application()


app.addRouter(router.endpoints)
app.use(parseJson)
app.use(parseUrl('http://localhost:3000'))
app.listen(PORT, ()=>console.log(`Started listen PORT on ${PORT}`))