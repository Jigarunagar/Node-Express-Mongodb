const express = require("express");

const dotenv = require('dotenv')

const cors = require ('cors')

dotenv.config()

const port = process.env.port;

const app = express();

app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is Ready for serve.");
});

app.get("/user", (req, res) => {
  const user = [
    {
      id: 1,
      email: "john@gmail.com",
      username: "johnd",
      password: "m38rmF$",
      name: {
        firstname: "john",
        lastname: "doe",
      },
    },
    {
      id: 2,
      email: "morrison@gmail.com",
      username: "mor_2314",
      password: "83r5^_",
      name: {
        firstname: "david",
        lastname: "morrison",
      },
    },
    {
      id: 3,
      email: "kevin@gmail.com",
      username: "kevinryan",
      password: "kev02937@",
      name: {
        firstname: "kevin",
        lastname: "ryan",
      },
    },
    {
      id: 4,
      email: "don@gmail.com",
      username: "donero",
      password: "ewedon",
      name: {
        firstname: "don",
        lastname: "romer",
      },
    },
    {
      id: 5,
      email: "derek@gmail.com",
      username: "derek",
      password: "jklg*_56",
      name: {
        firstname: "derek",
        lastname: "powell",
      },
    },
  ];

  return res.send(user)

});

app.listen(port , (err) => {
    !err ? console.log(`server start on port ${port}`) : null
})
