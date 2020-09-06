import * as React from "react";
import './PendingFriendshipStyling.css';

export class PendingFriendshipComponent extends React.Component{
    constructor(props){
        super(props);
    }

    toHost = `${process.env.REACT_APP_HOST_URL}:${process.env.REACT_APP_PORT_API}`;
    noProfile = "/images/users/none/no-profile-pic.png";

    state = {
         waitingUser: "",
         userName: "",
         profileImage: "",
         isSolved: false
     };

    componentWillMount() {
        const {waitingUser, userName, profileImage} = this.props;
        this.setState({
            waitingUser: waitingUser,
            userName: userName,
            profileImage: profileImage === "" ? this.noProfile : profileImage
        })
    }

    render() {
        return (
            <div>
                <div className="container pend-friend-component-container d-flex flex-row">
                    <div className="prof-img-cont-pend-friend-comp">
                            <img className="prof-img-pend-friend-comp" src={`${this.toHost}${this.state.profilePicture}`} alt=""/>
                    </div>
                    <div className="container d-flex flex-column pend-friend-det-container">
                        <div>
                            <h4 onClick={() => {this.goToFriendProfile();}}>@{this.state.userName}</h4>
                        </div>
                            <div>
                                {!this.state.isSolved &&
                                <div>
                                    <button type="button" onClick={() => {

                                    }} className="btn btn-primary">Decline</button>

                                    <button type="button" onClick={() => {
                                        this.addFriendBack()
                                    }} className="btn btn-primary">Accept</button>
                                </div>
                                }
                                {this.state.isSolved &&
                                    <div>
                                        <h3>Request solved</h3>
                                    </div>
                                }
                            </div>

                    </div>
                </div>
            </div>
        )
    }

}