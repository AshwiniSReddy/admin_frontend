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
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EventForm from './Admin/Admin';
import Signup from './signUp/Signup';
import Login from './login/Loginuser';
import { MyContext } from './context';
import AlertComponent from './alter/alert';

// Define a protected route component
const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem('userToken');
  // Check if userToken exists, if not, redirect to the login page
  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [alert, setalert] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('Highlights'); // Changed toggle to view for clarity
  const [headerContent,setHeaderContent]=useState(["Highlights","History"])
  const [selectedContactItem, setSelectedContactItem] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <MyContext.Provider value={{ user, setUser, alert, setalert, message, setMessage ,selectedItem, setSelectedItem,view, setView,headerContent,setHeaderContent,selectedContactItem, setSelectedContactItem,selectedHistoryItem, setSelectedHistoryItem}}>
          {alert ? <AlertComponent /> : (
            <Routes>
              <Route path="/" element={<Login />} />
              {/* Wrap EventForm in a ProtectedRoute component */}
              <Route path="/Dashboard" element={<ProtectedRoute><EventForm /></ProtectedRoute>} />
            </Routes>
          )}
        </MyContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
