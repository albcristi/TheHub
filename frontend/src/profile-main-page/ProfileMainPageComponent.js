import * as React from "react";
import {UserProfileCardComponent} from "./side-bar/UserProfileCardComponent";
import {SearchBarComponent} from "./search-bar/SearchBarComponent";
import  './UserProfilePageStyle.css';
import {NewPostAccessComponent} from "./new-post/NewPostAccessComponent";
import axios from 'axios';
import {PostListComponent} from "./post-list/PostListComponent";

class ProfileMainPageComponent extends React.Component{

    constructor(props){
        super(props);
    }
    render() {
        return (
            <div id="profile-page-container">
                <div>
                    <div className="d-flex">
                        <div role="navigation" id="left-column-profile-page">
                           <UserProfileCardComponent/>
                        </div>
                        <div role="main" id="middle-column-profile-page"  className="container d-flex flex-column justify-content-left">
                               <div>
                                   <NewPostAccessComponent/>
                               </div>
                               <div>
                                    <PostListComponent/>
                               </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileMainPageComponent;