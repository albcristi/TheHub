import * as React from "react";
import './FriendComponentStyling.css';
import axios from 'axios';
import {FriendshipService} from "../../../service/friendship-service/FriendshipService";

export class FriendComponent extends React.Component{
    state = {
        userName: "",
        profilePicture: "",
        friendRemoved: false,
        ancestorIsRelationOwner: true
    };

    friendshipService = new FriendshipService();

    constructor(props){
        super(props);
    }

    toHost = `${process.env.REACT_APP_HOST_URL}:${process.env.REACT_APP_PORT_API}`;

    componentWillMount() {
        const {userName} = this.props;
        const {profilePicture} = this.props;
        const {isProfileOwner} = this.props;
        this.setState({
            userName: userName,
            profilePicture: profilePicture === "" ? "/images/users/none/no-profile-pic.png" : profilePicture,
            friendRemoved: false,
            ancestorIsRelationOwner: isProfileOwner
        });
    }


    goToFriendProfile(){
        sessionStorage.setItem('friend_name', this.state.userName);
        window.location = '/profile-info/friend-page';
    }

    removeFriendship(){
       this.friendshipService.removeFriendship(sessionStorage.getItem('user_name'), this.state.userName)
           .then(res => {
               if(res.data['result']){
                   this.setState({
                       friendRemoved: true
                   })
               }
           })
           .catch(_ => {})
    }

    addFriendBack(){

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
                    {this.state.ancestorIsRelationOwner &&
                        <div>
                            {!this.state.friendRemoved &&
                            <button type="button" onClick={() => {
                                this.removeFriendship()
                            }} className="btn btn-primary">Remove</button>
                            }
                            {this.state.friendRemoved &&
                            <button type="button" onClick={() => {
                                this.addFriendBack()
                            }} className="btn btn-primary">Add Back</button>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}