import * as React from "react";
import './UserProfileCardStyle.css';
import {UserService} from "../../service/UserService";

export class UserProfileCardComponent extends React.Component{

    doLogOut(){
        let userService = new UserService();
        userService.logOutUser()
            .then((_) => {
                sessionStorage.setItem('isLogged', 'false');
                window.location='/';
            })
            .catch((_) =>{})
    }


    render() {
        return (
            <div style={{display: "unset", height: "auto"}} className="profileSideBarCard">
                <div id="side-bar-nav" className="bg-light">
                    <div className="sidebar-heading"><strong><h2 className="text-center text-primary user-name-side-bar">@{sessionStorage.getItem('user_name')}</h2></strong></div>
                    <div className="list-group list-group-flush">
                            <div  id="profile-card-options" className="d-flex flex-column">
                                    <div className="logo-side-bar">
                                        <div style={{marginRight: "3%"}}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-people"
                                                 fill="dark" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zm7.973.056v-.002.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <a href="#">Friends</a>
                                        </div>
                                    </div>

                                    <div className="logo-side-bar">
                                        <div style={{marginRight: "3%"}}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar4-event"
                                                 fill="dark" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M14 2H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
                                                <path fillRule="evenodd"
                                                      d="M14 2H2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2H2z"/>
                                                <path fillRule="evenodd"
                                                      d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"/>
                                                <rect width="2" height="2" x="11" y="7" rx=".5"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <a href="#">Events</a>
                                        </div>
                                    </div>

                                    <div className="logo-side-bar">
                                        <div style={{marginRight: "%"}}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16"
                                                 className="bi bi-shield-exclamation" fill="dark"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z"/>
                                                <path
                                                    d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <a href="#">Tips</a>
                                        </div>
                                    </div>

                                    <div className="logo-side-bar">
                                        <div style={{marginRight: "3%"}}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-door-open"
                                                 fill="dark" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
                                                <path fillRule="evenodd"
                                                      d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
                                                <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
                                            </svg>
                                        </div>
                                        <a onClick={this.doLogOut} href="#">Log Out</a>
                                    </div>
                            </div>

                    </div>
                </div>
            </div>
        )
    }
}
