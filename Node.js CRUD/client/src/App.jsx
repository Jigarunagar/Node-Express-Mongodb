import "./App.css";
import Userdata from "./components/Userdata.jsx";
import UserForm from "./components/UserForm.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/adduser">Add User</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Userdata />} />
          <Route path="/adduser" element={<UserForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
