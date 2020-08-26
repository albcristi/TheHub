import * as React from "react";
import './RegisterComponentStyle.css';
import {UserService} from "../service/UserService";

class RegisterComponent extends React.Component{


    constructor(props){
        super(props);
    }

    // HANDLE EMAIL DATA FIELD
    handleEmailInput(){
        let formObject =  document.getElementById('box');
        formObject = new FormData(formObject);
        let typedEmail = formObject.get('usr_email');
        let regex = new RegExp('[a-zA-Z0-9._]+@{1,1}[a-zA-Z0-9]+\.[a-zA-Z0-9]+');
        if(!regex.test(typedEmail)){
            window.jQuery("#email-msg").text("Invalid email format");
            return false;
        }
        window.jQuery("#email-msg").text('');
        return true;
    }

    // HANDLE DATA RELATED TO USER NAME FIELD
    handleUserNameInput(){
        let formObject =  document.getElementById('box');
        formObject = new FormData(formObject);
        let typedUserName = formObject.get('usr_name');
        if(typedUserName.length < 4){
            // USER NAME SHOULD HAVE AT LEAST 4 CHARS
            window.jQuery("#usr-name-msg").text('User name should contain at least 4 characters')
        }
        else{
             let userService = new UserService();
             userService.checkUserNameUnicity(typedUserName)
                 .then((res) =>{
                     if(!res.data.availability){
                         window.jQuery("#usr-name-msg").text('User name already taken')
                         return;
                     }
                     window.jQuery("#usr-name-msg").text('')
                 })
                 .catch((_) => {})
        }
    }

    // HANDLE PASSWORD INPUT DATA
    handelPasswordInput(){
        let formObject =  document.getElementById('box');
        formObject = new FormData(formObject);
        let typedPassword = formObject.get('usr_password');
        let errorMessage = "";
        if(typedPassword.length <= 7){
            errorMessage += 'Password length should at least 8 chars\n'
        }
        let regex1 = new RegExp('[0-9]+.*[A-Z]+');
        let regex2 = new RegExp('[A-Z]+.*[0-9]+');
        if(!regex1.test(typedPassword) && !regex2.test(typedPassword)){
            errorMessage  += 'Password should include least one number and one capital letter\n';
        }
        if(errorMessage.length > 0){
            window.jQuery("#pass-msg").text(errorMessage);
            return false;
        }
        window.jQuery("#pass-msg").text('');
        return true;
    }

    // HANDLE RE-ENTERED PASSWORD
    handleReEnteredPasswordInput(){
        let formObject =  document.getElementById('box');
        formObject = new FormData(formObject);
        let typedPassword = formObject.get('usr_password');
        let reEnteredPassword = formObject.get('re_usr_password');
        if(typedPassword !== reEnteredPassword){
            window.jQuery("#re-pass-msg").text('Passwords must match')
        }
        else{
            window.jQuery("#re-pass-msg").text('');
        }
        return typedPassword === reEnteredPassword;
    }


    // HANDLE PHONE NUMBER
    handlePhoneNumberInput(){
        let formObject =  document.getElementById('box');
        formObject = new FormData(formObject);
        let typedPhoneNumber = formObject.get('phone-number');
        let regex = new RegExp('^[0-9]+$');
        let er = "";
        if(!regex.test(typedPhoneNumber)){
            er += 'Phone numbers contain only digits'
        }
        window.jQuery('#phone-msg').text(er);
        return er.length === 0;
    }
    registerClicked = (e) => {
        e.preventDefault();
    };

    render() {
        sessionStorage.setItem('show-log-in','false');
        return (
            <div id="reg-data">
                <form  id="box" className="container" onSubmit={this.registerClicked}>
                    <h1>Almost a member...</h1>
                    <input type="text" name="usr_email" placeholder="Email" onChange={()=>{this.handleEmailInput()}} required/>
                    <p id="email-msg"></p>
                    <input type="text" onChange={() => {this.handleUserNameInput()}} name="usr_name" placeholder="Username" required/>
                    <p id="usr-name-msg" className="text-danger"></p>
                    <input  type="password" name="usr_password" placeholder="Password" onChange={()=>{this.handelPasswordInput()}} required/>
                    <p id="pass-msg" className="text-danger"></p>
                    <input type="password" name="re_usr_password" placeholder="Confirm password" onChange={()=>{this.handleReEnteredPasswordInput()}} required/>
                    <p id="re-pass-msg" className="text-danger"></p>
                    <input type="text" name="phone-number" placeholder="Your Phone Number" onChange={()=>{this.handlePhoneNumberInput()}} required/>
                    <p id="phone-msg" className="text-danger"></p>
                    <input type="submit" name="" value="Register"/>
                </form>
            </div>
        )
    }
}

export default RegisterComponent;