import React, {Suspense} from "react";
import './MainPage.css';
import LogInComponent from "../log-in/LogInComponent";
import {Link, Route, Switch} from "react-router-dom";
import ToggleComponent from "../ToggleComponent";
import RegisterComponent from "../register/RegisterComponent";

const AboutPage = React.lazy(() => import('../about-page/AboutComponent'));

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }



    render() {

        return (
            <div id="main_component">
                <ToggleComponent>
                        {({showContent, changeDisplayProperty}) => (
                            <div id="hide-me">
                                {showContent && sessionStorage.getItem('isLogged') === 'false' &&
                                    sessionStorage.getItem('show-log-in') === "true" &&
                                <div>
                                    <div id="main-body-container" className="container">
                                        <div className="container d-flex justify-content-center">
                                            <div id="image-container-home-page" className="container">
                                                <img id="img-log-in-page" width="500" src={require('./img3.png')} alt="..."/>
                                            </div>
                                                <div id="log-com" className="container">
                                                    <LogInComponent/>
                                                </div>
                                        </div>
                                    </div>
                                    <div id="info-container-log-page">
                                        <div>
                                             <p className="text-center text-info">Best place where you can organize public or private
                                            events and trips</p>
                                        </div>
                                        <div>
                                            <Link id="about-link-home-page" to={'/about'} onClick={changeDisplayProperty} className="text-center text-info">About Us</Link>
                                        </div>
                                        <div>
                                            <Link id="register-link-page" to={'/register'} onClick={changeDisplayProperty} className="text-center text-info">Register</Link>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>

                        )}
                </ToggleComponent>
                <Suspense fallback={
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                }>
                <Switch>
                     <Route exact path={'/about'} component={AboutPage}/>
                     <Route exact path={'/register'} component={RegisterComponent}/>
                </Switch>
                </Suspense>
            </div>
        )
    }
}

export default MainPage;

