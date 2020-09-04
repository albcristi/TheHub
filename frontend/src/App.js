import React, {Suspense} from 'react';
import './App.css';
import MainPage from "./welcome-page/MainPage.js";
import {Route, Switch} from "react-router";
import ProfileMainPageComponent from "./profile-main-page/ProfileMainPageComponent";
import {SearchBarComponent} from "./profile-main-page/search-bar/SearchBarComponent";
import {UserProfileInformationComponent} from "./profile-main-page/user-profile-information-page/UserProfileInformationComponent";
import {FriendListComponent} from "./profile-main-page/friends/friend-list/FriendListComponent";

class App  extends React.Component{

   constructor(props){
       super(props);
   }

   showLogIn(){
         sessionStorage.setItem('show-log-in', "true");
   }

   render() {
       if(sessionStorage.getItem('isLogged') !== "true") {
           sessionStorage.setItem('isLogged', "false");
       }
       if(sessionStorage.getItem('show-log-in') !== "false"){
           sessionStorage.setItem('show-log-in', "true");
       }

        return (
            <div className="App">
                <div id="upper-nav-bar" className="navbar fixed-top k17-header navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between">
                        <div>
                            <a onClick={() => this.showLogIn()}
                               href={sessionStorage.getItem('isLogged') === "true" ? "/profile" : "/"}
                               className="navbar-brand d-flex align-items-center">
                                <svg id="log-svg-elem-nav-bar" width="1em" height="1em" viewBox="0 0 16 16"
                                     className="bi bi-heart" fill="red"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>

                                <strong style={{marginLeft: 10}}>The Hub</strong>
                            </a>
                        </div>
                        <div>
                             { sessionStorage.getItem('isLogged') === 'true' &&
                                <SearchBarComponent/>
                            }
                        </div>
                    </div>
                </div>
                <div id="main-wrapper">
                    <div id="wrapper_main_page">
                       <MainPage/>
                    </div>

                    <Suspense fallback={
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }>
                        <Switch>
                            <Route exact path={'/profile'} component={ProfileMainPageComponent}/>
                            <Route exact path={'/profile-info'} render={
                                (props) => (
                                    <UserProfileInformationComponent userName={sessionStorage.getItem('user_name')} isProfileOwner={true}/>
                                )
                            }/>
                            <Route exact path={'/profile-info/friend-page'} render={
                                (props) => (
                                    <div>
                                        <UserProfileInformationComponent userName={sessionStorage.getItem('friend_name')} isProfileOwner={false}/>
                                    </div>
                                )}/>
                            <Route exact path={'/my-friends'} render={
                                (props) => (
                                    <div style={{marginTop: "100px"}}>
                                        <FriendListComponent userName={sessionStorage.getItem('user_name')}
                                                             isOwnerOfProfile={true}/>
                                    </div>
                                )
                            }/>
                        </Switch>
                    </Suspense>

                </div>
            </div>
        );
    }

}

export default App;
