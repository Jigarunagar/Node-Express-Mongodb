const express = require('express')

const port = 8000

const app = express()

app.set('view engine' , 'ejs')

app.get('/' , (req , res) => {
    res.render('index')
})

app.listen(port , (err) => {
    err ? console.log('server not start') : console.log(`server start on port ${port}`);
})