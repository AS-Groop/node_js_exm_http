const router = require('./src/user-router');
const mongoose= require('mongoose');
const Application = require('./framework/Application');
const parseJson = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl')
const PORT = process.env.PORT || 5000;

const app = new Application();

// password mongoose f0Q5GlHE32SqiwWT

app.addRouter(router.endpoints);
app.use(parseJson);
app.use(parseUrl('http://localhost:3000'));

const start = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://asadbeksheraliyev07:asd456@cluster0.xdzdyhl.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Started listen PORT on ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}
start().catch(err=>console.log(err))