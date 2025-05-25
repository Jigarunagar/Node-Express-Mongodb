const http = require('http')
// file structure
const fs = require('fs')
const port = 4070

const server = http.createServer((req , res) => {
    let url = req.url
    if(url == '/'){
        fs.readFile('index.html' , (err , data) => {
            if(err){
                res.writeHead(404)
                res.end('file not found')
            }
            res.end(data)
        })
    }else if(url == '/about'){
        fs.readFile('about.html' , (err , data) => {
            if(err){
                res.writeHead(404)
                res.end('file not found')
            }
            res.end(data)
        })
    }else if(url == '/contact'){
        fs.readFile('contact.html' , (err , data) => {
            if(err){
                res.writeHead(404)
                res.end('file not found')
            }
            res.end(data)
        })
    }else{
        res.writeHead(404)
        res.end('file not found')  
    }
})

server.listen(port , () => {
    console.log('server successfully start');
})