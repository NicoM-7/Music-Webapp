import React from "react";
import { useNavigate } from "react-router-dom";

function DMCA(){

    const navigate = useNavigate();
    const privacyPolicyButton = () => {
        navigate("/createPrivacyPolicy", {replace: true});
    }

    const takedownPolicyButton = () => {
        navigate("/createTakedownPolicy", {replace: true});
    }

    const acceptableUsePolicyButton = () => {
        navigate("/createAcceptableUsePolicy", {replace: true});
    }

    const takedownProcedureButton = () => {
        navigate("/takedownProcedureDocument", {replace: true});
    }

    return (
        <React.Fragment>
            <button onClick={privacyPolicyButton}>Create and Edit Privacy and Secuirity Policiy</button>
            <button onClick={takedownPolicyButton}>Create and Edit Takedown Policy</button>
            <button onClick={acceptableUsePolicyButton}>Create and Edit Acceptable Use Policy</button>
            <button onClick={takedownProcedureButton}>Takedown Procedure Document</button>
        </React.Fragment>
    )
}
export default DMCA;