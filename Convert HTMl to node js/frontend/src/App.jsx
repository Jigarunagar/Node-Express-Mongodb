import { useState , useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [user, setUser] = useState([])

  useEffect(() => {
    let res = axios.get('http://localhost:4040/user').then((response) => {
      setUser(response.data)
    }).catch((err) => {
      console.log(err);
    })
  })

  return (
    <>
      <h1>This is User Page Module</h1>
      <div className='main_card'>

      {
        user.map((user) => {
          return(
            <div className='card'>
              <ul>
                <li>Name : {user.name.firstname} {user.name.lastname}</li>
                <li>Email :{user.email}</li>
                <li>Password :{user.password}</li>
              </ul>
            </div>
          )
        })
      }
      </div>
    </>
  )
}

export default App
