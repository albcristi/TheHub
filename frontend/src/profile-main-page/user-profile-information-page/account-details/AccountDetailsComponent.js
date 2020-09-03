import * as React from "react";
import './AccountDetailsStyling.css';
import {UserDataValidator} from "../../../data-validators/user-data-validator/UserDataValidator";

export class AccountDetailsComponent extends React.Component{
    state = {
        userName: "",
        email: "",
        birthday: "",
        phone: "",
        isOwner: false,
        showGeneralInfo: false,
        editMode: false
    };

    userDataValidator = new UserDataValidator();

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

    changeDisplayInfoProperty(){
        this.setState({showGeneralInfo: !this.state.showGeneralInfo})
    }

    changeEditModeProperty(){
        this.setState({
            editMode: !this.state.editMode
        })
    }

    makeProfileUpdate(){
        // TODO: IMPLEMENT
    }

    userTypingNewBirthdate(){
        let typedBday = window.jQuery(`#bd-${this.state.userName}`).val();
        let color = this.userDataValidator.checkBirthDate(typedBday) ? "#5cb85c" : "#d9534f";
        window.jQuery(`#bd-${this.state.userName}`).css("background-color", color);
    }

    userTypedNewPhone(){
        let typedPhone = window.jQuery(`#pn-${this.state.userName}`).val();
        let color = this.userDataValidator.checkPhoneNumber(typedPhone) ? "#5cb85c" : "#d9534f";
        window.jQuery(`#pn-${this.state.userName}`).css("background-color", color);
    }


    userTypedNewEmail(){
        let typedEmail = window.jQuery(`#em-${this.state.userName}`).val();
        let color = this.userDataValidator.checkUserEmail(typedEmail) ? "#5cb85c" : "#d9534f";
        window.jQuery(`#em-${this.state.userName}`).css("background-color", color);
    }

    render() {
        return (
            <div>
                { this.state.userName !== "" &&
                    <div className="container account-details-component-container d-flex flex-column">
                        <div className="container user-name-container">
                            <div>
                                <h3 className="text-secondary">User Name</h3>
                            </div>
                            <div>
                                    <h5 className="text-secondary">@{this.state.userName}</h5>
                            </div>
                        </div>
                        <div className="container text-secondary">
                            <h3 className="general-information" onClick={() => {this.changeDisplayInfoProperty()}}>
                                About Me</h3>
                            {  this.state.showGeneralInfo &&
                                <div className="container general-information-container">
                                    <hr/>
                                    <h4> Date of birth</h4>
                                    { !this.state.editMode && this.state.isOwner &&
                                        <h5  onClick={() => {this.changeEditModeProperty()}}>{this.state.birthday}</h5>
                                    }
                                     { this.state.editMode && this.state.isOwner &&
                                        <input className="input input-account-details-comp"
                                               placeholder={this.state.birthday} id={`bd-${this.state.userName}`}
                                        onChange={() => {this.userTypingNewBirthdate()}}/>
                                    }
                                    {this.state.isOwner &&
                                        <div>
                                            <h4>Phone Number</h4>
                                                { !this.state.editMode &&
                                                    <h5 onClick={() => {
                                                        this.changeEditModeProperty()
                                                    }}>{this.state.phone}</h5>
                                                }
                                                {this.state.editMode &&
                                                <input className="input input-account-details-comp"
                                                       placeholder={this.state.phone} id={`pn-${this.state.userName}`}
                                                        onChange={()=>{this.userTypedNewPhone()}}/>
                                                }
                                            <h4>Email</h4>
                                            {!this.state.editMode &&
                                            <div>
                                                <h5 onClick={()=>{this.changeEditModeProperty()}}>{this.state.email}</h5>
                                            </div>
                                            }
                                            {this.state.editMode &&
                                            <div>
                                                <input placeholder={this.state.email} className="input-account-details-comp"
                                                    id={`em-${this.state.userName}`}
                                                    onChange={()=>{this.userTypedNewEmail()}}/>
                                            </div>
                                            }
                                        </div>

                                    }

                                    {this.state.editMode && this.state.isOwner &&
                                        <div style={{marginTop:"20px", marginBottom: "40px"}} className="d-flex justify-content-center">
                                            <div style={{marginRight: "20px"}}>
                                                  <button onClick={()=>{this.changeEditModeProperty()}} className="btn btn-secondary">Undo Changes</button>
                                            </div>
                                            <div>
                                                  <button onClick={()=>{this.makeProfileUpdate()}} className="btn btn-success">Save Changes</button>
                                            </div>
                                        </div>
                                    }
                                    { !this.state.editMode &&
                                        <div>
                                            <svg onClick={() => {
                                                this.changeDisplayInfoProperty()
                                            }} className="bi bi-caret-up show-less-info" width="3em" height="2em"
                                                 viewBox="0 0 16 16"
                                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
                                            </svg>
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