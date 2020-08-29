import * as React from "react";
import './ValidationAccountComponentStyle.css';
import {UserService} from "../../service/UserService";
import {MessageComponent} from "../../message-component/MessageComponent";

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
                if(res.data['failed']){
                    sessionStorage.setItem('access-key','none');
                }
                else{
                     sessionStorage.setItem('access-key',res.data['access_key']);
                }
            })
            .catch((_) => {alert('Make sure the introduced number is a valid one')})
    }

    verifyAccessKey(){
        let typedKey = window.jQuery("#input-access-key").val();
        if(typedKey === ''){
            window.jQuery("#wapp-empty-input-msg").modal('show');
            return;
        }
        let realKey  = sessionStorage.getItem('access-key');
        sessionStorage.removeItem('access-key');
        if(realKey === 'none' || realKey === null){
            window.jQuery('#wapp-verification-code-missing-msg').modal('show');
            return;
        }
        if(realKey === typedKey){
           this.userService.createNewAccount(sessionStorage.getItem('new-user-name'),
                   sessionStorage.getItem('new-user-password'),
                   sessionStorage.getItem('new-user-phone'),
                   sessionStorage.getItem('new-user-email'))
               .then((res) => {
                   if(res.data['status']){
                       // user account creation is a success
                   }
                   // something went wrong
                   window.jQuery('#wapp-account-creation-failed').modal('show');
               })
               .catch((_) => {
                    window.jQuery('#wapp-account-creation-failed').modal('show');
               })

        }
        else{
            window.jQuery("#failure-message-verification-code-wapp").text("Keys do not match");
        }

    }


    render() {
        return (
            <div>
                    <div id="validation-account-comp" className="d-flex justify-content-center">
                        <div  className="card" id="whatsapp-verify-account-card">
                            <div className="card-body">
                                <h5 className="card-title">WhatsApp Key Generation</h5>
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
                                <input id="input-access-key" className="text-center" placeholder="verification key"/>
                                <button onClick={() => {this.verifyAccessKey()}} className="btn btn-primary">Verify Code</button>
                                <p id="failure-message-verification-code-wapp" className="text-danger"></p>
                            </div>
                            <div id="val-wapp-message">
                            </div>
                        </div>
                    </div>
                <div id="warning-modals-wapp-verification">
                           <MessageComponent messageID={'wapp-empty-input-msg'}
                                             messageTitle={'Error'}
                                             messageBody={'Enter a verification code before submitting the result'}
                                             bodyStyle={'text-info'}
                                             headerStyle={'text-danger'}
                           />
                           <MessageComponent messageID={'wapp-verification-code-missing-msg'}
                                             messageTitle={'Error'}
                                             messageBody={'Verification code not received from server.' +
                                             'Try to resend the verification code and make sure you followed' +
                                             ' correctly the steps described above'}
                                             bodyStyle={'text-info'}
                                             headerStyle={'text-danger'}
                           />
                           <MessageComponent messageID={'wapp-account-creation-failed'}
                                             messageTitle={'Error'}
                                             messageBody={'Something went wrong. Account creation failed, '+
                                             'try again later!'}
                                             bodyStyle={'text-info'}
                                             headerStyle={'text-danger'}
                           />
                </div>
            </div>
        );
    }
}
