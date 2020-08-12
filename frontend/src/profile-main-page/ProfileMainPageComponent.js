import * as React from "react";
import {UserProfileCardComponent} from "./side-bar/UserProfileCardComponent";
import {SearchBarComponent} from "./search-bar/SearchBarComponent";

class ProfileMainPageComponent extends React.Component{

    constructor(props){
        super(props);
    }
    render() {


        return (
            <div>
                <div>
                    <div style={{position: "relative"}} className="d-flex justify-content-between">
                        <div>
                           <UserProfileCardComponent/>
                        </div>
                        <div style={{paddingTop: "60px"}} className="container d-flex flex-column">
                                <div>
                                    <p>aaaa</p>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <p>aa</p>
                                </div>
                        </div>
                        <div style={{display: "unset", paddingTop: "60px", overflow: "visible"}}>
                            <div  id="right-fixed-column">
                                <div  style={{padding: "1%"}} className="d-flex justify-content-center bg-light" id="search-bar-container">
                                    <div>
                                        <h4 className="text-info text-center">Explore </h4>
                                    </div>
                                    <div>
                                        <SearchBarComponent/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileMainPageComponent;