const http = require('http')
const dotenv = require('dotenv')
// const url = require('url')

dotenv.config(
{path:'./.env'}
)

const server = http.createServer((req , res) => {

    let url = req.url

    if(url === '/'){
        res.write('Home Page')
        res.end()
    }else if(url === '/about'){
         res.write('About Page')
        res.end()
    }else if(url === '/faq'){
         res.write('FAQ Page')
        res.end()
    }else{
        res.writeHead(404)
        res.write('404 Page Not Found!!!')
        res.end()
    }
})

server.listen(process.env.PORT , (err) => {
    if(err){
        console.log('server not successfully start!!');
    }

    console.log('server successfully start!!');
})