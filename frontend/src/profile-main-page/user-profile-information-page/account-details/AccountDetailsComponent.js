import * as React from "react";
import './AccountDetailsStyling.css';

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
                    <div className="container account-details-component-container d-flex flex-column">
                        <div className="container user-name-container">
                            <h3 className="text-secondary">User Name</h3>
                            <hr/>
                            <h5 className="text-secondary">@{this.state.userName}</h5>
                        </div>
                        <div className="container text-secondary">
                            <h3>General Information</h3>
                            <hr/>
                            <h4>Birthday</h4>
                            <h5>{this.state.birthday}</h5>
                            {this.state.isOwner &&
                                <div>
                                    <h4>Phone Number</h4>
                                    <h5>{this.state.phone}</h5>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }

}