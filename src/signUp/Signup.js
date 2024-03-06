// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { Link } from 'react-router-dom';
// function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Instantiate useNavigate

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post('http://localhost:5000/api/register', { // Replace with your server URL
//       email: email,
//       password: password,
//     })
//     .then(response => {
//       console.log(response.data);
//       setMessage('User Created Successfully');
//       // Redirect to login page upon successful registration
//       navigate('/login');

//     })
//     .catch(error => {
//       console.error('There was an error!', error);
//       setMessage('Error creating user');
//     });
//   };


//   function handleSignIn(e){
//       e.preventDefault();
//       navigate('/login');
//   }
    
  

//   return (
//     <div>
//       <h2>Register</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">SignUp</button>
        
//       </form>
//       <Link to="/login">Sign In</Link>
//     </div>
//   );
// }

// export default Register;


import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Signup() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_BACKEND_URL}/api/auth/google/callback`,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Sign up Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/signup.jpg" alt="signup" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Create Account</h2>
					<input type="text" className={styles.input} placeholder="Username" />
					<input type="text" className={styles.input} placeholder="Email" />
					<input
						type="password"
						className={styles.input}
						placeholder="Password"
					/>
					<button className={styles.btn}>Sign Up</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing up with Google</span>
					</button>
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
