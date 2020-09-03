import * as React from "react";
import './AccountDetailsStyling.css';

export class AccountDetailsComponent extends React.Component{
    state = {
        userName: "",
        email: "",
        birthday: "",
        phone: "",
        isOwner: false,
        showGeneralInfo: false
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
                            <div className="container d-flex justify-content-center">
                                <div>
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person"
                                         fill="blue" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-secondary">User Name</h3>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                    <h5 className="text-secondary">@{this.state.userName}</h5>
                            </div>
                        </div>
                        <div className="container text-secondary">
                            <h3 className="general-information" onClick={() => {this.setState({showGeneralInfo: !this.state.showGeneralInfo})}}>
                                General Information</h3>
                            {  this.state.showGeneralInfo &&
                                <div>
                                    <hr/>
                                    <h4> Birthday </h4>
                                        <h5>{this.state.birthday}</h5>
                                    {this.state.isOwner &&
                                        <div>
                                        <h4>Phone Number</h4>
                                        <h5>{this.state.phone}</h5>
                                        </div>
                                    }
                               </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }

}