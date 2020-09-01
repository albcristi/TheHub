import * as React from "react";
import {UserService} from "../../service/UserService";


export class UserProfileInformationComponent extends React.Component{
    state = {
        userName: "",
        email: "",
        birthday: "",
        profile_picture_url: ""
    };

    userService = new UserService();

    constructor(props){
        super(props);
    }

    componentWillMount() {
        const {userName} = this.props;
        this.userService.getUserProfileInformation(userName)
            .then(res => {
                console.log(res.data);
            })
            .catch((_) => {})
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}