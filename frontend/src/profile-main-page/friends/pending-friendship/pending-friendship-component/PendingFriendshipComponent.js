import * as React from "react";
import './PendingFriendshipStyling.css';
import {FriendshipService} from "../../../../service/friendship-service/FriendshipService";

export class PendingFriendshipComponent extends React.Component{
    constructor(props){
        super(props);
    }

    toHost = `${process.env.REACT_APP_HOST_URL}:${process.env.REACT_APP_PORT_API}`;
    noProfile = "/images/users/none/no-profile-pic.png";
    friendshipService = new FriendshipService();

    state = {
         waitingUser: "",
         userName: "",
         profileImage: "",
         isSolved: false,
         solvedMessage: ""
     };

    componentWillMount() {
        const {waitingUser, userName, profileImage} = this.props;
        this.setState({
            waitingUser: waitingUser,
            userName: userName,
            profileImage: profileImage === "" ? this.noProfile : profileImage
        })
    }

    acceptFriendRequest(){
        this.friendshipService
            .acceptPendingFriendship(this.state.userName)
            .then((res) => {
                if(res.data['result']){
                    this.setState({
                        isSolved: true,
                        solvedMessage: "You are now friends"
                    })
                }
            })
            .catch(_=>{})
    }

    denyFriendRequest(){
        this.friendshipService
            .declinePendingFriendship(this.state.userName)
            .then(res => {if(res.data['result']){
                    this.setState({
                        isSolved: true,
                        solvedMessage: "You declined this request"
                    })
                }})
            .catch(_=>{})
    }

    render() {
        return (
            <div>

                <div className="container pend-friend-component-container shadow d-flex flex-row">
                    <div className="prof-img-cont-pend-friend-comp">
                            <img className="prof-img-pend-friend-comp" src={`${this.toHost}${this.state.profileImage}`} alt=""/>
                    </div>
                    <div className="container d-flex flex-column pend-friend-det-container">
                        <div>
                            <h4 onClick={() => {}}>@{this.state.userName}</h4>
                        </div>
                            <div>
                                {!this.state.isSolved &&
                                <div>
                                    <button style={{marginRight: "5px"}} type="button" onClick={() => {
                                        this.denyFriendRequest()
                                    }} className="btn btn-secondary">Decline</button>

                                    <button type="button" onClick={() => {
                                        this.acceptFriendRequest()
                                    }} className="btn btn-success">Accept</button>
                                </div>
                                }
                                {this.state.isSolved &&
                                    <div>
                                        <small>{this.state.solvedMessage}</small>
                                    </div>
                                }
                            </div>

                    </div>
                </div>
            </div>
        )
    }

}