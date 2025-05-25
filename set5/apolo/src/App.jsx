import './App.css'
import { useState , useEffect } from 'react'

function App() {

  const[user , setuser] = useState([])

  console.log('user' , user);
  
  useEffect(() => {
    return async() => {
      let res = await fetch('http://localhost:4080/api/user')
      let data = await res.json()
      console.log('data' , data);
      setuser(data)
    }
  })

  return (
    <>
      
    </>
  )
}

export default App
