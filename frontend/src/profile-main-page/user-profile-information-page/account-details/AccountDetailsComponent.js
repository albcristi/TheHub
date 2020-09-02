import * as React from "react";


export class AccountDetailsComponent extends React.Component{
    state = {
        userName: "",
        email: "",
        birthday: "",
        phone: "",
        isOwner: false
    };

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        const {userName, email, birthday, phone} = this.props;
        this.setState({
            isOwner: userName===sessionStorage.getItem('user_name'),
            userName: userName,
            email: email,
            birthday: birthday,
            phone: phone
        })

    }

    render() {
        return (
            <div>
                { this.state.userName !== "" &&
                    <div>

                    </div>
                }
            </div>
        )
    }

}