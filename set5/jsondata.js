import express from 'express'

let app = express()

// url structure

const port = 4080

app.get((req , res) => {
    let url = req.url
    if(url == '/'){
        res.writeHead(200 , {"content-type":'text'})
        res.end('This is Home Page')
    }else if(url == '/api/user'){
       const user = {
        name:'Nitin',
        age:40,
        proffsion:'development'
       }

       res.writeHead(200 , {"content-type":'application/json'})
       res.end(JSON.stringify(user))

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