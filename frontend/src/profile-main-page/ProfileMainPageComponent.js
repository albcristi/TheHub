import * as React from "react";
import {UserProfileCardComponent} from "./side-bar/UserProfileCardComponent";
import {SearchBarComponent} from "./search-bar/SearchBarComponent";
import  './UserProfilePageStyle.css';
import {NewPostAccessComponent} from "./new-post/NewPostAccessComponent";
import axios from 'axios';

class ProfileMainPageComponent extends React.Component{

    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <div className="d-flex justify-content-between">

                        <div id="left-column-profile-page">
                           <UserProfileCardComponent/>
                        </div>
                        <div id="middle-column-profile-page"  className="container d-flex flex-column">

                                   <div>
                                       <NewPostAccessComponent/>
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