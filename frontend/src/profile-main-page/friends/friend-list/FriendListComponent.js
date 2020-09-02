import * as React from "react";
import {UserService} from "../../../service/UserService";
import {FriendComponent} from "../friend-component/FriendComponent";


export class FriendListComponent extends React.Component{
    state = {
        userName: "",
        friends: []
    };

    userService = new UserService();

    constructor(props){
        super(props);
    }

    componentWillMount() {
        const {userName} = this.props;
        // TODO: GET FRIEND LIST
        this.userService
            .getFriends(userName)
            .then((res) => {
                this.setState({
                    userName: userName,
                    friends: res.data
                })
            })
            .catch((_) => {})
    }
    render() {
        return (
            <div>
                { this.state.friends.length > 0 &&
                    <div className="container">
                        {
                            this.state.friends
                                .map((value, index) => (
                                        <div key={index}>
                                            <FriendComponent userName={value.user_name}
                                                             profilePicture={value.profile_picture}/>
                                        </div>
                                ))
                        }
                    </div>
                }
            </div>
        )
    }

}