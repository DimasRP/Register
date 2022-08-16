
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Protected from './HOC/ProtectedRoute';
import Detail from "./Pages/Detail";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(false)

  const checkIfLogin = () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      setUser(false);
    } else {
      setUser(true);
    }
  };
  useEffect(() => {
    checkIfLogin();
  }, []);

  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route 
          path='/dashboard' 
          element={
            <Protected user={user}>
              <Dashboard/>
            </Protected>
          }
        />
        <Route
        path="/detail/:id"
        element={
          <Protected user={user}>
            <Detail />
          </Protected>
        }
      />
      </Routes>
  );
}

export default App;
