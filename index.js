const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const mongoose = require('mongoose')
const ShortUrl = require('./models/url.js')

mongoose.connect('mongodb://127.0.0.1:27017/urls',{
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(()=>{console.log('connection successful')})
.catch((err)=>{console.log(err)})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))


app.get('/', async function(req, res) {
    const shorturls = await ShortUrl.find();
    res.render(path.join(__dirname, '/views/index.ejs'),{shorturls : shorturls});
});

app.post('/url', async function(req, res) {
    await ShortUrl.create({full:req.body.full});
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})