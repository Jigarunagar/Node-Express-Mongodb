// import express from ('express')

const express = require('express')

const port = 4040

const app = express()

app.get('/' , (_ , res) => {
    res.send('Hello world!!!')
})

app.listen(4040 ,  (err) => {
    if(err){
        console.log('server not start!!');
    }

    console.log(`server start on port ${port}`)
})