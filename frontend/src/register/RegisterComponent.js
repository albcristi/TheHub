import * as React from "react";
import './RegisterComponentStyle.css';
import {UserService} from "../service/UserService";

class RegisterComponent extends React.Component{


    constructor(props){
        super(props);
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
            return;
        }
        window.jQuery("#pass-msg").text('');

    }

    // HANDLE RE-ENTERED PASSWORD
    handleReEnteredPasswordInput(){
        let formObject =  document.getElementById('box');
        formObject = new FormData(formObject);
        let typedPassword = formObject.get('usr_password');
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
                                <input type="text" name="usr_email" placeholder="Email" required/>
                                <input type="text" onChange={() => {this.handleUserNameInput()}} name="usr_name" placeholder="Username" required/>
                                <p id="usr-name-msg" className="text-danger"></p>
                                <input  type="password" name="usr_password" placeholder="Password" onChange={()=>{this.handelPasswordInput()}} required/>
                                <p id="pass-msg" className="text-danger"></p>
                                <input type="password" name="re_usr_password" placeholder="Enter password again" required/>
                                <p id="re-pass-msg" className="text-danger"></p>
                                <input type="text" name="phone-number" placeholder="Phone Number" required/>
                                <p id="phone-msg" className="text-danger"></p>
                                <input type="submit" name="" value="Register"/>
                            </form>

            </div>
        )
    }
}

export default RegisterComponent;