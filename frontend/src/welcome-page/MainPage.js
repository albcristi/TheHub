import React, {Suspense} from "react";
import './MainPage.css';
import LogInComponent from "../log-in/LogInComponent";
import {Link, Route, Switch} from "react-router-dom";


const AboutPage = React.lazy(() => import('../about-page/AboutComponent'));

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }


    goToAboutPage (){

        document.getElementById("main-body-container").style.display='none';
        document.getElementById("about-link-home-page").style.display='none';
    }

    render() {
        return (
            <div id="main_component">
                 <div id="main-body-container" className="container">
                    <div className="container d-flex justify-content-center">
                        <div  id="image-container-home-page" className="container">
                            <img width="500" src={require('./img3.png')} alt="..."/>
                        </div>
                        <div className="container">
                            <LogInComponent/>
                        </div>
                    </div>
                    <p  className="text-center text-info">Best place where you can organize public or private events</p>
                 </div>

                 <Link id="about-link-home-page" to={'/about'} onClick={this.goToAboutPage} className="text-center text-info">About Us</Link>
                 <Suspense fallback={
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }>
                    <Switch>
                        <Route exact path={'/about'} component={AboutPage}/>
                    </Switch>
                </Suspense>

            </div>
        )
    }
}

export default MainPage;

