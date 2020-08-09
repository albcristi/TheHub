import React, {Suspense} from 'react';
import './App.css';
import MainPage from "./welcome-page/MainPage.js";
import {Route, Switch} from "react-router";
import ProfileMainPage from "./profile-main-page/ProfileMainPage";

class App  extends React.Component{

   constructor(props){
       super(props);
   }

    render() {
        return (
            <div className="App">
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between">
                        <a href="http://localhost:3000" className="navbar-brand d-flex align-items-center">
                            <svg id="log-svg-elem-nav-bar" width="1em" height="1em" viewBox="0 0 16 16"
                                 className="bi bi-heart" fill="red"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>

                            <strong style={{marginLeft: 10}}>The Hub</strong>
                        </a>
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
                            <Route exact path={'/profile'} component={ProfileMainPage}/>
                        </Switch>
                    </Suspense>
                    <div id="profile_page" style={{display: "none"}}>
                        <ProfileMainPage/>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
