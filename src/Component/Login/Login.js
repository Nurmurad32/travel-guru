import React, { useContext, useState } from 'react';
import './Login.css'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';
import googleIcon from '../../images/Icon/google.png';
import fbIcon from '../../images/Icon/fb.png';


firebase.initializeApp(firebaseConfig);

const Login = () => {
	const [newUser, setNewUser] = useState(false);
	const [user , setUser] = useState({
		isSignedIn : false,
		name: '',
		lastName:'',
		email: '',
		password: '',
		confirmPassword: ''
	})
	
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const history = useHistory();
	  const location = useLocation();
	  let { from } = location.state || { from: { pathname: "/" } };

	var provider = new firebase.auth.GoogleAuthProvider();
	var fbProvider = new firebase.auth.FacebookAuthProvider();


	const handelSignIn = () => {
		firebase.auth().signInWithPopup(provider)
		.then(res => {
			console.log(res)
			const {displayName, email}= res.user;
			const signedInUser ={
				isSignedIn : true,
				name: displayName,
				email: email
			}
			setUser(signedInUser);
			setLoggedInUser(signedInUser);
			history.replace(from);
		})
		.catch(err =>{

		})
	}

	const handelFbSignIn = () => {
		firebase.auth().signInWithPopup(fbProvider)
		.then(function(result) {
			
			const {displayName, email}= result.user;
			const signedInUser ={
				isSignedIn : true,
				name: displayName,
				email: email
			}
			setUser(signedInUser);
			setLoggedInUser(signedInUser);
			history.replace(from);
			
		  })
		  .catch(function(error) {
			
			
			
		  });
	}

	const handelSignedOut = () => {
		firebase.auth().signOut()
		.then(res => {
			const SignedOutUser ={
				isSignedIn : false,
				name: '',
				lastName:'',
				email: '',
				password: '',
				confirmPassword: '',
				error: '',
				success: false
			}
			setUser(SignedOutUser);
		  })
		  .catch(err => {
			// An error happened.
		  });
	}
	const handelBlur = (e) =>{
		let isFieldValid = true ;
		if(e.target.name === 'email'){
			isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
		}
		if(e.target.name === 'password'){
			const isPasswordValid= e.target.value.length > 6;
			const passwordHasNumber = /\d{1}/.test(e.target.value);
			isFieldValid = isPasswordValid && passwordHasNumber
		}
		if(e.target.name === 'confirmPassword'){
			if (user.password !== "undefined" && e.target.value !== "undefined") {
				if (user.password !== e.target.value) {
				  isFieldValid = false;
				}
			console.log(user.password , user.confirmPassword)
			}
			
		}
		if(isFieldValid){
			const newUserInfo = {...user};
			newUserInfo[e.target.name] = e.target.value;
			setUser(newUserInfo);
		}
	}
	const handelSubmit = (e) =>{
		console.log(user.email, user.password, user.confirmPassword)
		
		if (newUser && user.password && user.email && user.confirmPassword && user.name) {
			firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then(res => {
				
				const newUserInfo = {...user};
				newUserInfo.error = '';
				newUserInfo.success = true;
				setUser(newUserInfo); 
				updateUserName(user.name);
				console.log(res)
			})
			.catch(error=> {
			
				const newUserInfo = {...user};
				newUserInfo.error = error.message;
				newUserInfo.success = false;
				setUser(newUserInfo); 
				
			  });
		}
		
		if(!newUser && user.email && user.password){
			firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.then(res => {
				const newUserInfo = {...user};
				newUserInfo.error = '';
				newUserInfo.success = true;
				setUser(newUserInfo);
				setLoggedInUser(newUserInfo);
				history.replace(from);
				console.log('signed in', res.user);
			})
			.catch(error=> {
				const newUserInfo = {...user};
				newUserInfo.error = error.message;
				console.log(error.message);
				newUserInfo.success = false;
				setUser(newUserInfo);
				
			  });
		}
		e.preventDefault();
	}

	const updateUserName = ( name ) => {
		const user = firebase.auth().currentUser;

		user.updateProfile({
		displayName: name
		
		}).then(function() {
		console.log("update username")
		}).catch(function(error) {
		console.log(error)
		});
	}

	
    return (
        <div className="form-container">
			
			 {/* show user Name */}
			 {
				user.isSignedIn && 
					<p style={{color:"green" , fontWeight:'bold',marginTop: '100px'}}>welcome, {user.email}</p> 
			}
			<p style={{color:'red',fontWeight:'bold',marginTop: '100px'}}>{user.error}</p>
			{
				user.success && <p style={{color:'green',fontWeight:'bold'}}>User {newUser ?'created' : 'Logged In'} successfully</p>
			}
			 {/* bb */}
			<div className="form-container-box">
			<div style={{textAlign:'left', padding:'10px 20px',fontSize:'24px', fontWeight:'bold', width:'75%', marginLeft:'50px'}}>
			
				<h2>{ newUser ?'Create an account':'Login'}</h2>
			</div>
			<form onSubmit={handelSubmit} className="reg-form">

				{
				newUser && <div >
					<input className="reg-input" type="text" placeholder="User name" name="name" onBlur={handelBlur}  /> <br/>
					
					{/* <input className="reg-input" type="text" placeholder="Last Name" name="lastname" onBlur={handelBlur}  /> */}
				</div>
				}
				<div >
					<input className="reg-input" type="email" placeholder="Email" name="email" onBlur={handelBlur}  />
					
				</div>
				<div >
					<input className="reg-input" type="password" placeholder="Password" name="password" onBlur={handelBlur}  />
					
				</div>
				{!newUser && <div style={{width: '75%',
    margin: 'auto'}} className="justify-content-between d-flex">
					
					<div>
					<input type="checkbox" name="" id="check"/>
					<label for="check"> Remember me</label>
					</div>
					
					<p className="reg-btn" >Forgot password </p>
				</div>}
				{
				newUser && <div >
					<input className="reg-input" type="password" placeholder="Confirm password" name="confirmPassword" onBlur={handelBlur}  />
					
				</div>
				}
				<button className="submit-btn">{newUser ?'Create an account' : 'Login'}</button>

			</form> 
			<div style={{display:'flex', margin:'auto',width:'75%',justifyContent: 'center'}}>
				<p >{ newUser ?  "Already have an account?" : "Don't have an account?" }</p>
				<p className="reg-btn" onClick={()=> setNewUser(!newUser) } >{newUser ? "Log in" : "Create an account"} 
				</p>
			</div>
			</div>

			





			<div className="div1">
				<span> Or </span>
			</div>
			

			

				<div className="btn" style={{border:' 1px solid #C7C7C7',
					borderRadius: '57px',
					display: 'flex',
					width: '35%',
					margin: '0 auto',marginBottom:'10px'}}>
					<p className="icon"><img src={fbIcon} alt=""/></p>
					<p onClick={handelFbSignIn} style={{margin:'auto'}}>Continue with Facebook</p>
				</div>
			
			
				<div className="btn" style={{border:' 1px solid #C7C7C7',
					borderRadius: '57px',
					display: 'flex',
					width: '35%',
					margin: '0 auto'}}>
					<p className="icon"><img src={googleIcon} alt=""/></p>
					<p onClick={handelSignIn} style={{margin:'auto'}}>Continue with Google</p>
				</div>
			
			
		</div>
    );
};

export default Login;