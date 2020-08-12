import * as React from "react";
import {UserProfileCardComponent} from "./side-bar/UserProfileCardComponent";
import {SearchBarComponent} from "./search-bar/SearchBarComponent";
import  './UserProfilePageStyle.css';


class ProfileMainPageComponent extends React.Component{

    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <div style={{position: "relative"}} className="d-flex">

                        <div id="left-column-profile-page">
                           <UserProfileCardComponent/>
                        </div>
                        <div id="middle-column-profile-page"  className="container d-flex flex-column">
                                <div className="container align-left">
                                    <p>TODO: create new post Component</p>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <p>aa</p>
                                </div>
                        </div>
                        <div id="right-column-profile-page">
                                   <SearchBarComponent/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileMainPageComponent;