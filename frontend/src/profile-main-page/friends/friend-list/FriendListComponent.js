import * as React from "react";
import {UserService} from "../../../service/UserService";
import {FriendComponent} from "../friend-component/FriendComponent";


export class FriendListComponent extends React.Component{
    state = {
        userName: "",
        friends: [],
        isOwnerOfProfile: false
    };

    userService = new UserService();

    constructor(props){
        super(props);

    }

    componentWillMount() {
        const {userName} = this.props;
        const {isOwnerOfProfile} = this.props;
        this.userService
            .getFriends(userName)
            .then((res) => {
                this.setState({
                    userName: userName,
                    friends: res.data,
                    isOwnerOfProfile: isOwnerOfProfile
                });
            })
            .catch((_) => {});
    }
    render() {
        return (
            <div>
                { this.state.friends.length > 0 &&
                    <div className="container d-flex justify-content-center friend-list-container">
                        <div className="container d-flex flex-column left-container">
                            {
                                this.state.friends
                                    .map((value, index) => (
                                            <div key={`left-${index}`}>
                                                {index % 2 === 0 &&
                                                <FriendComponent userName={value.user_name}
                                                                 profilePicture={value.profile_picture}
                                                 isProfileOwner={this.state.isOwnerOfProfile}/>
                                                }
                                            </div>
                                    ))
                            }
                        </div>

                        <div className="container d-flex flex-column right-container">
                             {
                                this.state.friends
                                    .map((value, index) => (
                                            <div key={`right-${index}`}>
                                                { index%2===1 &&
                                                    <FriendComponent userName={value.user_name}
                                                                     profilePicture={value.profile_picture}
                                                    isProfileOwner={this.state.isOwnerOfProfile}/>
                                                }
                                            </div>
                                    ))
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }

}