import * as React from "react";
import './FriendComponentStyling.css';

export class FriendComponent extends React.Component{
    state = {
        userName: "",
        profilePicture: ""
    };

    constructor(props){
        super(props);
    }

    toHost = `${process.env.REACT_APP_HOST_URL}:${process.env.REACT_APP_PORT_API}`;

    componentWillMount() {
        const {userName} = this.props;
        const {profilePicture} = this.props;
        this.setState({
            userName: userName,
            profilePicture: profilePicture === "" ? "/images/users/none/no-profile-pic.png" : profilePicture
        })
    }


    goToFriendProfile(){
        sessionStorage.setItem('friend_name', this.state.userName);
        window.location = '/profile-info/friend-page';
    }

    render() {
        return (
            <div className="container friend-component-container d-flex flex-row">
                <div className="prof-img-cont-friend-comp">
                        <img className="prof-img-friend-comp" src={`${this.toHost}${this.state.profilePicture}`} alt=""/>
                </div>
                <div className="container d-flex flex-column friend-det-container">
                    <div>
                        <h4 onClick={() => {this.goToFriendProfile();}}>@{this.state.userName}</h4>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary">Unfriend</button>
                    </div>
                </div>
            </div>
        )
    }
}