// import './App.css';
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import EventForm from './Admin/Admin';
// import Signup from './signUp/Signup';
// import Login from './login/Loginuser';
// import { MyContext } from './context';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// function App() {
//   const [user, setUser] = useState(null);

//   const getUser = async () => {
//     try {
//       const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login/success`;
//       const { data } = await axios.get(url, { withCredentials: true });
//       console.log(data)
//       setUser(data.user._json);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <MyContext.Provider value={{ user, setUser }}>
//           <Routes>

//             {
//               console.log(user)}
//             <Route path="/" element={user ? <EventForm user={user} /> : <Navigate to="/login" />} />
//             <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//             <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
           
//           </Routes>
//         </MyContext.Provider>

//       </BrowserRouter>

//     </div>
//   );
// }

// export default App;


// import './App.css';
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import EventForm from './Admin/Admin';
// import Signup from './signUp/Signup';
// import Login from './login/Loginuser';
// import { MyContext } from './context';
// import AlertComponent from './alter/alert';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// function App() {
//   const [user, setUser] = useState(null);
//    const [alert,setalert]=useState(false);
//    const [message,setMessage]=useState('');

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <MyContext.Provider value={{ user, setUser,alert,setalert,message,setMessage}}>
//         {alert ? <AlertComponent /> : (
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route path="/Dashboard" element={<EventForm />} />
//             </Routes>
//           )}

//         </MyContext.Provider>

//       </BrowserRouter>

//     </div>
//   );
// }

// export default App;



import './App.css';
import axios from "axios";
import io from 'socket.io-client';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EventForm from './Admin/Admin';
import Signup from './signUp/Signup';
import Login from './login/Loginuser';
import { MyContext } from './context';
import AlertComponent from './alter/alert';




function App() {
  const [user, setUser] = useState(null);
  const [alert, setalert] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('Highlights'); // Changed toggle to view for clarity
  const [headerContent,setHeaderContent]=useState(["Highlights","History"])
  const [selectedContactItem, setSelectedContactItem] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io('https://admindashboard.paramscience.org', {
      withCredentials: true,
      // transports: ['websocket', 'polling'],
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
 

  const getUser = async () => {
    try {
      const url = `https://admindashboard.paramscience.org/api/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data,"login")
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (socket) {
      // Listen for initial activities
      socket.on('init-activities', (activities) => {
        setNotifications(activities);
      });

      // Listen for new notifications
      socket.on('addEventActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });
      // Listen for new notifications
      socket.on('deleteEventActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });
   
      socket.on('EditEventActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });
      socket.on('createAlertActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });

      socket.on('deleteAlertActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });

      socket.on('editAlertActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });

      socket.on('deletContactDetailsActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });

      socket.on('deletContactHistoryActivity', (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });


      return () => {
        socket.off('init-activities');
        socket.off('addEventActivity');
        socket.off('deleteEventActivity');
      };
    }
  }, [socket]);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <MyContext.Provider value={{ user, setUser, alert, setalert, message, setMessage ,selectedItem, setSelectedItem,view, setView,headerContent,setHeaderContent,selectedContactItem, setSelectedContactItem,selectedHistoryItem, setSelectedHistoryItem,socket, setSocket,notifications, setNotifications}}>
          {alert ? <AlertComponent /> : (
            <Routes>
              <Route path="/" element={user ? <Navigate to="/Dashboard" /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/Dashboard"/> : <Login/>} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />

              {/* Wrap EventForm in a ProtectedRoute component */}
              <Route path="/Dashboard" element={<EventForm />} />
            </Routes>
          )}
        </MyContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
