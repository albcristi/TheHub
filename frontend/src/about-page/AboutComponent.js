import * as React from "react";
import  './AboutComponent.css';



class AboutComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        document.getElementById("main-body-container").style.display='none';
        document.getElementById("about-link-home-page").style.display='none';

        return (
            <div className="car-wrapper-mine">
                <div   id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                                <img  id="car-img-mine1" src={require('./img1.jpg')} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3>In the mood for discovering the nature?</h3>
                                    <h3>Remember that place you always wanted to explore</h3>
                                </div>
                        </div>
                        <div className="carousel-item">
                                <img  id="car-img-mine2" src={require('./img2.jpg')} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3>Or maybe you want to go for a city break</h3>
                                    <h3>The city you always dreamed to visit</h3>
                                </div>
                        </div>
                        <div className="carousel-item">
                              <img id="car-img-mine3" src={require('./img3.jpg')} className="d-block w-100" alt="..."/>
                              <div className="carousel-caption d-none d-md-block">
                                  <h1>The Hub</h1>
                                  <h3>Best place for organizing your events and trips</h3>
                                  <h3>Make it possible</h3>
                                  <h4><a href="/">Register Now</a></h4>
                              </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            </div>
        );
    }

}

export default AboutComponent;