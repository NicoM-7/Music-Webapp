import React from 'react';

function SignUp(){
    return(
        <div>
            <form>
                <label htmlFor="usernameInput">Username: </label>
                <input type="text" id="usernameInput" placeholder="Enter Username"></input><br></br>
                <label htmlFor="emailInput">Email: </label>
                <input type="text" id="emailInput" placeholder="Enter Email"></input><br></br>
                <label htmlFor="passwordInput">Password: </label>
                <input type="text" id="passwordInput" placeholder="Enter Password"></input><br></br>
                <button>submit</button>
            </form>
        </div>
    );
}

export default SignUp;