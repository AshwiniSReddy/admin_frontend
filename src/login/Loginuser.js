// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For redirecting to another route
// import './login.css'


// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { // Update with your actual endpoint
//       email,
//       password,
//     })
//     .then((response) => {
//       console.log(response.data);
//       // Store the received token in localStorage or context
//       localStorage.setItem('userToken', response.data.token);
//       // Redirect to another route upon success, adjust the route as needed
//       navigate('/Dashboard');
//     })
//     .catch((error) => {
//       console.error('Login error:', error);
//       setErrorMessage(error.response.data.message || 'Error logging in');
//     });
//   };

//   return (
// 	<div className='login-container1'>
// 		<div className='logo_container'>
// 			<img src='./logo_no_text_no_bg.png'/>
// 		</div>
//         <div className="login-container">
// 	  <h2>Login</h2>
// 	  {errorMessage && <p className="error">{errorMessage}</p>}
// 	  <form onSubmit={handleLogin} className="login-form">
// 		<div>
// 		  <label>Email:</label>
// 		  <input
// 			type="email"
// 			value={email}
// 			onChange={(e) => setEmail(e.target.value)}
// 			required
// 		  />
// 		</div>
// 		<div>
// 		  <label>Password:</label>
// 		  <input
// 			type="password"
// 			value={password}
// 			onChange={(e) => setPassword(e.target.value)}
// 			required
// 		  />
// 		</div>
// 	     <div className='login-button'><button type="submit">Login</button></div>	
// 	  </form>
// 	</div>
// 	</div>

//   );

// }


// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For redirecting to another route
// import './login.css'


// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { // Update with your actual endpoint
//       email,
//       password,
//     })
//     .then((response) => {
//       console.log(response.data);
//       // Store the received token in localStorage or context
//       localStorage.setItem('userToken', response.data.token);
//       // Redirect to another route upon success, adjust the route as needed
//       navigate('/Dashboard');
//     })
//     .catch((error) => {
//       console.error('Login error:', error);
//       setErrorMessage(error.response.data.message || 'Error logging in');
//     });
//   };

//   return (
// 	<div className='login-container1'>
// 		<div className='logo_container'>
// 			<img src='./logo_no_text_no_bg.png'/>
// 		</div>
//         <div className="login-container">
// 	  <h2>Login</h2>
// 	  {errorMessage && <p className="error">{errorMessage}</p>}
// 	  <form onSubmit={handleLogin} className="login-form">
// 		<div>
// 		  <label>Email:</label>
// 		  <input
// 			type="email"
// 			value={email}
// 			onChange={(e) => setEmail(e.target.value)}
// 			required
// 		  />
// 		</div>
// 		<div>
// 		  <label>Password:</label>
// 		  <input
// 			type="password"
// 			value={password}
// 			onChange={(e) => setPassword(e.target.value)}
// 			required
// 		  />
// 		</div>
// 	     <div className='login-button'><button type="submit">Login</button></div>	
// 	  </form>
// 	</div>
// 	</div>

//   );

// }

// export default Login;


import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./styles.module.css";
import googleLogo from '../images/googleLogo.png'
import Loginillutration from '../images/Login.jpg'
import './login.css'

function Login() {
	const googleAuth = () => {

		window.open(
			`${process.env.REACT_APP_BACKEND_URL}/api/auth/google/callback`,
			"_self"
		);
	};


	return (
		<div className="admin-container">
			
			<div className="admin-left">
			
				<div className='logo_container'>
					<img src='./logo_no_text_no_bg.png' />
				</div>
				<div >

					<button className={styles.google_btn} onClick={googleAuth}>
						<img src={googleLogo} alt="google icon" />
						<span>Sign in with Google</span>
					</button>

				</div>
			</div>
			<div className="admin-right">
				{/* <img src={Loginillutration} alt="login illutration" /> */}
			</div>
		</div>
	);
}

export default Login;
