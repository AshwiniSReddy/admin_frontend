import './App.css';
import axios from "axios";
import {  Navigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import EventForm from './Admin/Admin';
import Signup from './signUp/Signup';
import Login from './login/Loginuser';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `http://localhost:5000/auth/login/success`;
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
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <EventForm user={user} /> : <Navigate to="/login" />}
          />
          {/* <Route path="/" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          {/* <Route path="/Dashboard" element={<EventForm />} /> */}
          <Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <Signup />}
				/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
