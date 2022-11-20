import React from 'react';
import { signInWithGoogle } from "../firebase"

function Login() {
    return (
        <div className="form">
            <form>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
            <button onClick={signInWithGoogle}>Login With Google</button>
        </div>
    );
}

export default Login;