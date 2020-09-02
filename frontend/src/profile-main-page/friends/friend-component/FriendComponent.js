import * as React from "react";

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
            profilePicture: profilePicture
        })
    }

    render() {
        return (
            <div>
                {this.state.userName}
            </div>
        )
    }
}