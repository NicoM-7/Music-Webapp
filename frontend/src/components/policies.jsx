import React from "react";
import { useNavigate } from "react-router-dom";

function Policies(){

    const navigate = useNavigate();

    const privacyPolicyButton = () => {
        navigate("/privacyPolicy", {replace: true});
    }

    const takedownPolicyButton = () => {
        navigate("/takedownPolicy", {replace: true});
    }

    const acceptableUsePolicyButton = () => {
        navigate("/acceptableUsePolicy", {replace: true});
    }

    return (
        <React.Fragment>
            <button onClick={privacyPolicyButton}>Privacy Policy</button>
            <button onClick={takedownPolicyButton}>Takedown Policy</button>
            <button onClick={acceptableUsePolicyButton}>Acceptable Use Policy</button>
        </React.Fragment>
    )
}
export default Policies;