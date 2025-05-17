const http = require ('http')

const port = 3000

const server = http.createServer((req , res) => {
    res.writeHead(200 , {'content-type': 'text'})
    res.write(JSON.stringify({name:"red and white skill education"}))
    res.end()
})

server.listen(port , (err) => {
    if(err){
        console.log('server not start');
    }
    console.log('server successfully created!');
})