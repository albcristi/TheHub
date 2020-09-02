import * as React from "react";
import {UserService} from "../../service/UserService";
import './UserProfileInformationStyle.css';
import {FriendListComponent} from "../friends/friend-list/FriendListComponent";

export class UserProfileInformationComponent extends React.Component{
    state = {
        userName: "",
        email: "",
        birthday: "",
        profilePicture: "",
        phone: "",
        isProfileOwner: true
    };

    toHost = `${process.env.REACT_APP_HOST_URL}:${process.env.REACT_APP_PORT_API}`;

    userService = new UserService();

    constructor(props){
        super(props);
    }

    componentWillMount() {
        const {userName} = this.props;
        const {isProfileOwner} = this.props;
        this.userService.getUserProfileInformation(userName)
            .then(res => {
                if(res.data['usr_name'] === ""){
                    alert('Something went wrong, data was not received from server');
                    return;
                }
                this.setState({
                    userName: res.data['usr_name'],
                    email: res.data['usr_email'],
                    birthday: res.data['birth_day'],
                    profilePicture: res.data['profile_picture'],
                    phone: res.data['phone_number'],
                    isProfileOwner: isProfileOwner
                });
            })
            .catch((_) => {})
    }

    render() {
        const userName = this.state.userName;
        return (
            <div className="d-flex flex-column bd-highlight">
                <div className="user-info-profile" id={`user-info-profile-&${this.state.userName}`}>
                    <div className="user-profile-info-pic-and-name">
                        <div className="d-flex flex-column">
                            <div className="profile-image-container">
                                { !(this.state.profilePicture === null) &&
                                    <img className="profile-pic" src={this.toHost+this.state.profilePicture} alt="..."/>
                                }
                                 { (this.state.profilePicture === null) &&
                                    <img className="profile-pic" src={require('./no-profile-pic.png')} alt="..."/>
                                }
                            </div>
                            <div className="container">
                                 <strong>
                                     <h2 className="text-secondary strong">@{this.state.userName}</h2>
                                 </strong>
                                <hr/>
                            </div>
                        </div>

                    </div>
                    <div className="container d-flex justify-content-center">
                        <div>
                            <h5 className="profile-info-option text-secondary">Events</h5>
                        </div>
                        <div>
                            { userName === sessionStorage.getItem('user_name') &&
                                <h5 className="profile-info-option text-secondary">Account Details</h5>
                            }
                        </div>
                        <div>
                            <h5 className="profile-info-option text-secondary">Friends</h5>
                        </div>
                    </div>
                </div>
                <div role="main" className="container">
                    {/*
                        Contains the currently shown element
                          - Events
                          - Account Details
                          - Friends
                    */}
                    <div>
                        {  userName!=="" &&
                            <FriendListComponent userName={userName} isOwnerOfProfile={this.state.isProfileOwner}/>
                        }

                    </div>
                </div>
            </div>
        )
    }
}