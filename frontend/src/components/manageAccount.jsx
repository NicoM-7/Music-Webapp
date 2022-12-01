import React from "react";
import ChangePassword from "./changePassword";
import ChangeUsername from "./changeUsername";
function ManageAccount() {

    return (
        <div className="mainPlaylistDiv">
            <React.Fragment>
                <ChangeUsername />
                <br></br>
                <ChangePassword />
            </React.Fragment>
        </div>
    )

}

export default ManageAccount;