import {useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import { auth } from "../firebase";
function SignUp() {

    let navigate = useNavigate();

    const [inputs, setInputs] = useState({
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const signUp = (e) => {

        e.preventDefault();
        const email = inputs.email;
        const password = inputs.password;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                if(user != null){
                    navigate("/tracks");
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

            });
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
        </div>
    );
}

export default SignUp;