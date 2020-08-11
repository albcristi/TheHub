import * as React from "react";
import {UserProfileCardComponent} from "./side-bar/UserProfileCardComponent";

class ProfileMainPageComponent extends React.Component{

    constructor(props){
        super(props);
    }
    render() {


        return (
            <div>
                <div className="d-flex col">
                    <div style={{ marginTop: "2%"}} className="d-flex justify-content-between">
                        <div className="container" style={{marginLeft: "1%"}}>
                           <UserProfileCardComponent/>
                        </div>
                        <div  className="container">
                            <p>todo</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileMainPageComponent;