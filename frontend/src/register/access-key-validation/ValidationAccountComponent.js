import * as React from "react";
import './ValidationAccountComponentStyle.css';
import {UserService} from "../../service/UserService";

export class ValidationAccountComponent extends React.Component{

    userService = new UserService();
    constructor(props){
        super(props);
    }

    getVerificationCode(){
        this.userService
            .getVerificationCodeByWhatssApp(sessionStorage.getItem('new-user-name'),
                 sessionStorage.getItem('new-user-phone'))
            .then((res) => {
                console.log(res.data)
            })
            .catch((_) => {})
    }

    render() {
        return (
            <div id="validation-account-comp" className="d-flex justify-content-center">
                <div  className="card" id="whatsapp-verify-account-card">
                    <div className="card-body">
                        <h5 className="card-title">WhatsApp Validation</h5>
                    </div>
                    <div className="card-body">
                        <hr/>
                        <p className="text-info" style={{fontSize: "15px"}}>First Step</p>
                        <p>Add <small className="text-info">+14155238886</small> <br/> to your contacts</p>
                        <hr/>
                        <p className="text-info" style={{fontSize: "15px"}}>Second Step</p>
                        <p>Send the following message on WhatsApp
                        </p>
                        <small>join cowboy-must</small>
                         <hr/>
                        <p className="text-info" style={{fontSize: "15px"}}>Third Step</p>
                        <p onClick={() => {this.getVerificationCode()}} className="verif-link">Send Verification Code</p>
                        <input placeholder="Access Key"/>
                        <button className="btn btn-primary">Verify Code</button>
                    </div>
                </div>
            </div>
        );
    }
}
