import React from "react";
import ChangePassword from "./changePassword";
import ChangeUsername from "./changeUsername";
function ManageAccount(){

    return(
        <React.Fragment>
        <ChangeUsername/>
        <br></br>
        <ChangePassword/>
        </React.Fragment>
    )

}

export default ManageAccount;