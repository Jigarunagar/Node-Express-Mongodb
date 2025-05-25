const http = require('http')

// url structure

const port = 4060

const server = http.createServer((req , res) => {
    let url = req.url
    if(url == '/'){
        res.writeHead(200 , {"content-type":'text'})
        res.end('This is Home Page')
    }else if(url == '/about'){
        res.writeHead(200 , {"content-type":'text'})
        res.end('This is AboutUs Page')
    }else if(url == '/contact'){
        res.writeHead(200 , {"content-type":'text'})
        res.end('This is ContactUs Page')
    }else{
        res.writeHead(404)
        res.end('404 Page Not Found!')
    }
})

server.listen(port , (err)=> {
    if(err){
        console.log('server not started!!');
    }
    console.log(`server successfully start on port ${port}`);
    
})