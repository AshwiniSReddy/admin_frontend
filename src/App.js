import './App.css';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import EventForm from './Admin/Admin';
import Signup from './signUp/Signup';
import Login from './login/Loginuser';
import { MyContext } from './context';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `https://ec2-13-233-173-240.ap-south-1.compute.amazonaws.com/api/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <MyContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={user ? <EventForm user={user} /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          </Routes>
        </MyContext.Provider>

      </BrowserRouter>

    </div>
  );
}

export default App;
