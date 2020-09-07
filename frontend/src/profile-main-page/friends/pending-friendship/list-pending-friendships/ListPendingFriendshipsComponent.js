import * as React from "react";
import {PendingFriendshipComponent} from "../pending-friendship-component/PendingFriendshipComponent";
import {FriendshipService} from "../../../../service/friendship-service/FriendshipService";

export class ListPendingFriendshipsComponent extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        userName: "",
        pendingFriendships: [],
        isMinimized: false
    };

    friendshipService = new FriendshipService();

    componentWillMount() {
        const {userName} = this.props;
        this.friendshipService.retrieverPendingFriends(userName)
            .then(res => {
                console.log(res.data)
                this.setState({
                    userName: userName,
                    pendingFriendships: res.data
                })
            })
            .catch(_ => {})
    }



    render() {

        return (
            <div>
                <div>
                    <h4>Pending friendships</h4>
                </div>
                { this.state.pendingFriendships.length > 0 &&
                    <div className="container d-flex justify-content-center shadow p-3 mb-5  pend-friend-list-container">
                        <div className="container d-flex flex-column left-container">
                            {
                                this.state.pendingFriendships
                                    .map((value, index) => (
                                            <div key={`left-${index}`}>
                                                {index % 2 === 0 &&
                                                    <div>
                                                        <PendingFriendshipComponent waitingUser={this.state.userName}
                                                            userName={value.usr_name}
                                                            profileImage={value.profile_picture}/>
                                                    </div>
                                                }
                                            </div>
                                    ))
                            }
                        </div>

                        <div className="container d-flex flex-column right-container">
                             {
                                this.state.pendingFriendships
                                    .map((value, index) => (
                                            <div key={`right-${index}`}>
                                                { index%2===1 &&
                                                    <div>
                                                        <PendingFriendshipComponent waitingUser={this.state.userName}
                                                            userName={value.usr_name}
                                                            profileImage={value.profile_picture}/>
                                                    </div>
                                                }
                                            </div>
                                    ))
                            }
                        </div>
                    </div>
                }
                {this.state.pendingFriendships.length === 0 &&
                    <div>
                        <h4 className="text-secondary">
                            There are no pending request found for the moment
                        </h4>
                    </div>
                }
            </div>
        )
    }
}