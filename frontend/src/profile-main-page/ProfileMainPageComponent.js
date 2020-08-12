import * as React from "react";
import {UserProfileCardComponent} from "./side-bar/UserProfileCardComponent";

class ProfileMainPageComponent extends React.Component{

    constructor(props){
        super(props);
    }
    render() {


        return (
            <div>
                <div >
                    <div style={{position: "relative"}} className="d-flex justify-content-between">
                        <div>
                           <UserProfileCardComponent/>
                        </div>
                        <div  className="container">
                            <p>
                                todo
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <p>seee</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileMainPageComponent;