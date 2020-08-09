import * as React from "react";
import ProfileUserInformationComponent from "./profile-information/ProfileUserInformationComponent";


class ProfileMainPage extends React.Component{

    constructor(props){
        super(props);
    }
    render() {

        return (
            <div>
                <div className="d-flex col">
                    <div style={{marginLeft: "5%", marginTop: "2%"}} className="d-flex justify-content-between">
                        <ProfileUserInformationComponent/>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileMainPage;