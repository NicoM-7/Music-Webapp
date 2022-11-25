import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
function Login() {

    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            if (auth.currentUser != null) {
                navigate("/authenticated");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const signUpPage = () => {
        navigate("/signUp");
    }

    const [inputs, setInputs] = useState({});
    const [emailEmptyError, setEmailError] = useState(false);
    const [passwordEmptyError, setPasswordError] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const signIn = (e) => {

        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        const email = inputs.email;
        const password = inputs.password;

        if((email === undefined || email === "") || (password === undefined || password === "")){
            if(email === undefined || email === ""){
                setEmailError(true);
            }
            if(password === undefined || password === ""){
                setPasswordError(true);
            }
        }
        else{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                if (user != null && user.emailVerified) {
                    navigate("/management");
                }
                else{
                    sendEmailVerification(user).then(() => {
                        alert("Your account isn't verified. We have send an email to " + inputs.email + " with a link to verify your account.")
                    })
                    .catch(() => {
                        alert("A verification email has already been sent! Please wait a bit before sending another!");
                    })
                }

            })
            .catch((error) => {
                alert("Login unsuccsesful");
            });
    }
}
    return (
        <div className="form">
            <form onSubmit={signIn}>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} value={inputs.email || ""}/>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={inputs.password || ""}/>
                <button type="submit">Login</button>
            </form>

            <button onClick={signUpPage}>Sign Up</button>
            <button onClick={signInWithGoogle}>Login With Google</button>

            <p>{emailEmptyError ? "Email empty " : " "} {passwordEmptyError ? "Password empty " : " "}</p>
        </div>
    );
}

export default Login;