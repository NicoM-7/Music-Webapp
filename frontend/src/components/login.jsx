import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from "../firebase";
import {GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
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

    const [inputs, setInputs] = useState({
    });


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const signIn = (e) => {

        e.preventDefault();
        const email = inputs.email;
        const password = inputs.password;

        signInWithEmailAndPassword(auth, email, password)
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
        <div className="form">
            <form onSubmit={signIn}>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="email" onChange={handleChange} value={inputs.email || ""} required />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} value={inputs.password || ""} required />
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