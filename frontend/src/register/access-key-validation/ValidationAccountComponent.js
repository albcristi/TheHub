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
        console.log('aa');
        let typedKey = window.jQuery("#input-access-key").val();
        let realKey  = sessionStorage.getItem('access-key');
        console.log(realKey)
        sessionStorage.removeItem('access-key');
        if(realKey === 'none' || realKey === null){
            alert('Verification not received from server');
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
               })
               .catch((_) => {
                   window.jQuery("#val-wapp-message").appendChild("<MessageComponent messageID={'wap1'}, messageBody='aaaaa' messageTitle='ss'/>");
               })

        }
        else{
            window.jQuery("#failure-message-verification-code-wapp").text("Keys do not match");
        }

    }


    render() {
        return (
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
        );
    }
}
