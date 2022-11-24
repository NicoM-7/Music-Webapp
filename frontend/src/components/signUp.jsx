import {useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import { auth } from "../firebase";
function SignUp() {

    let navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [emailEmptyError, setEmailError] = useState(false);
    const [passwordEmptyError, setPasswordError] = useState(false);
    const [usernameEmptyError, setUsernameError] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const signUp = (e) => {

        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        setUsernameError(false);

        const username = inputs.uname;
        const email = inputs.email;
        const password = inputs.password;

        if((username === undefined || username === "") || (email === undefined || email === "") || (password === undefined || password === "")){
            
            if(username === undefined || username === ""){
                setUsernameError(true);
            }
            if(email === undefined || email === ""){
                setEmailError(true);
            }
            if(password === undefined || password === ""){
                setPasswordError(true);
            }
        }
        else{
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if(user != null){
                    navigate("/tracks");
                }
            })
            .catch((error) => {

                const parsedError = error.toString().substring(error.toString().indexOf(":") + 1, error.toString().lastIndexOf("."));
                console.log(parsedError);
                if(parsedError === " Firebase: Password should be at least 6 characters (auth/weak-password)"){
                    alert("Password must be at least 6 characters!");
                }
                else if(parsedError === " Firebase: Error (auth/invalid-email)"){
                    alert("Invalid email address!");    
                }
                else if(parsedError === " Firebase: Error (auth/email-already-in-use)"){
                    alert("This email is already registered!");
                }
            });
        }
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <label htmlFor="usernameInput">Username: </label>
                <input type="text" name="uname" onChange={handleChange} value={inputs.uname || ""} placeholder="Enter Username"></input><br></br>
                <label htmlFor="emailInput">Email: </label>
                <input type="text" name="email" onChange={handleChange} value={inputs.email || ""} placeholder="Enter Email"></input><br></br>
                <label htmlFor="passwordInput">Password: </label>
                <input type="text" name="password" onChange={handleChange} value={inputs.password || ""} placeholder="Enter Password"></input><br></br>
                <button type="submit">submit</button>
            </form>

            <p>{emailEmptyError ? "Email empty " : " "} {passwordEmptyError ? "Password empty " : " "} {usernameEmptyError ? "Username empty " : " "}</p>

        </div>
    );
}

export default SignUp;