import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting to another route
import './login.css'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { // Update with your actual endpoint
      email,
      password,
    })
    .then((response) => {
      console.log(response.data);
      // Store the received token in localStorage or context
      localStorage.setItem('userToken', response.data.token);
      // Redirect to another route upon success, adjust the route as needed
      navigate('/Dashboard');
    })
    .catch((error) => {
      console.error('Login error:', error);
      setErrorMessage(error.response.data.message || 'Error logging in');
    });
  };

  return (
	<div className='login-container1'>
		<div className='logo_container'>
			<img src='./logo_no_text_no_bg.png'/>
		</div>
        <div className="login-container">
	  <h2>Login</h2>
	  {errorMessage && <p className="error">{errorMessage}</p>}
	  <form onSubmit={handleLogin} className="login-form">
		<div>
		  <label>Email:</label>
		  <input
			type="email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		  />
		</div>
		<div>
		  <label>Password:</label>
		  <input
			type="password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			required
		  />
		</div>
	     <div className='login-button'><button type="submit">Login</button></div>	
	  </form>
	</div>
	</div>
	
  );
  
}

export default Login;


// import { Link } from "react-router-dom";
// import styles from "./styles.module.css";

// function Login() {
// 	const googleAuth = () => {
	
// 		window.open(
// 			`${process.env.REACT_APP_BACKEND_URL}/api/auth/google/callback`,
// 			"_self"
// 		);
// 	};
// 	return (
// 		<div className={styles.container}>
// 			<h1 className={styles.heading}>Log in Form</h1>
// 			<div className={styles.form_container}>
// 				<div className={styles.left}>
// 					<img className={styles.img} src="./images/login.jpg" alt="login" />
// 				</div>
// 				<div className={styles.right}>
// 					<h2 className={styles.from_heading}>Members Log in</h2>
// 					<input type="text" className={styles.input} placeholder="Email" />
// 					<input type="text" className={styles.input} placeholder="Password" />
// 					<button className={styles.btn}>Log In</button>
// 					<p className={styles.text}>or</p>
// 					<button className={styles.google_btn} onClick={googleAuth}>
// 						<img src="./images/google.png" alt="google icon" />
// 						<span>Sing in with Google</span>
// 					</button>
// 					<p className={styles.text}>
// 						New Here ? <Link to="/signup">Sing Up</Link>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Login;
