import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
function Login() {

    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            if (auth.currentUser != null) {
                navigate("/home");
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

        if ((email === undefined || email === "") || (password === undefined || password === "")) {
            if (email === undefined || email === "") {
                setEmailError(true);
            }
            if (password === undefined || password === "") {
                setPasswordError(true);
            }
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                fetch("http://" + window.location.hostname + ":9000/api/open/usernames/" + user.uid, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
                    .then(res => res.json())
                    .then(data => {
                        
                        if (user != null && user.emailVerified && data[0].activated === "true") {
                            navigate("/managePlaylists");
                        }

                        else if (data[0].activated === "false") {
                            alert("Your account has been disabled. Please contact your administrator!");
                        }

                        else {
                            sendEmailVerification(user).then(() => {
                                alert("Your account isn't verified. We have send an email to " + inputs.email + " with a link to verify your account.")
                            })
                                .catch(() => {
                                    alert("A verification email has already been sent! Please wait a bit before sending another!");
                                })
                        }
                    })
                    .catch(err => {
                        console.log("Error");
                    })
            })
            .catch((error) => {
                alert("Login unsuccsesful");
            });
    }

    return (
        <div className="form">
            <form onSubmit={signIn}>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} value={inputs.email || ""} />
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={inputs.password || ""} />
                <button type="submit">Login</button>
            </form>

            <button onClick={signUpPage}>Sign Up</button>
            <button onClick={signInWithGoogle}>Login With Google</button>

            <p>{emailEmptyError ? "Email empty " : " "} {passwordEmptyError ? "Password empty " : " "}</p>
        </div>
    );
}

export default Login;