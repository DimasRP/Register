
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Protected from './HOC/ProtectedRoute';
import { useEffect } from 'react';

function App() {
  const [user, setlogin] = useEffect(null)
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path='/dashboard' 
          element={
            <Protected user={false}>
              <Dashboard/>
            </Protected>
          }
        />
      </Routes>
  );
}

export default App;
