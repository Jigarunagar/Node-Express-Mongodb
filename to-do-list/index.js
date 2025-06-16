const express = require('express');

const port = 8090;

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.get('/', (req, res) => {
    return res.render('home');
})

let studatndata = [];

app.get('/form', (req, res) => {
    return res.render('form', {
        student: studatndata
    });
});

app.get('/editdata', (req, res) => {
    let usereditid = parseInt(req.query.id);

    let neweditdata = studatndata.filter((val) => {
        return val.userid === usereditid;
    });
    return res.render('edit', {
        editdata: neweditdata[0]
    });
});

app.get('/deletedata',(req,res)=>{
    let userdeleteid = parseInt(req.query.id);

    let newdeletedata = studatndata.filter((val)=>{
        return val.userid !== userdeleteid;
    });
    studatndata = newdeletedata;
    return res.redirect('/form');
});

app.post('/edituser', (req, res) => {
    let editid = req.body.editid;

    editid = parseInt(editid);

    studatndata = studatndata.map((user) => {
        if (user.userid === editid) {
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password 
        }
        return user;
    });
    console.log('user updated', editid);
    return res.redirect('/form');
});

app.post('/insertdata', (req, res) => {
    let userid = parseInt(req.body.userid);
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let obj = {
        userid: userid,
        name: name,
        email: email,
        password: password
    }
    studatndata.push(obj);
    console.log('studatndata successfully added !!');
    console.log(obj);
    return res.redirect('/form');
});

app.listen(port, (err) => {
    !err ? console.log(`server is started on port ${port}`) : null;
});