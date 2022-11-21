import React from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from "../firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
function Login() {

    let navigate = useNavigate();
    const provider = new GoogleAuthProvider(); 
    const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        if(auth.currentUser != null){
            navigate("/authenticated");
        }
    }).catch((err) => console.log(err));
}
    const signUpPage = () => {
        navigate("/signUp");
    }

    return (
        <div className="form">
            <form>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
                <div className="button-container">
                    <button onClick={signUpPage}>Sign Up</button>
                </div>
                
            </form>
            <button onClick={signInWithGoogle}>Login With Google</button>
        </div>
    );
}

export default Login;