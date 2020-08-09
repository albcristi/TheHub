import * as React from "react";
import axios from 'axios';
import './LogInComponentStyle.css';
const BASE_URL = 'http://localhost:8000/api';

class LogInComponent extends React.Component{
    constructor(props) {
        super(props);
    }



    static tryLogIn(userName, userPassword, failedMessageID){
        axios.post(`${BASE_URL}/do-log-in`,
            {
                user_name: userName,
                user_password: userPassword
            })
            .then((response) => {
                let logInResponse = response.data.cred_verified;
                if(!logInResponse){
                    document.getElementById("form-message")
                        .textContent="Wrong user name or/and password";
                    return;
                }

                let sessionToken = response.data.session_token;
                sessionStorage.setItem('user_name', userName);
                sessionStorage.setItem('token', sessionToken);

                /// TODO: CHECK HOW TO HIDE OTHER ELEMENTS ...
                window.href = '/profile';
                document.getElementById("profile_page").style.display="block";
                document.getElementById("wrapper_main_page").style.display="none";

            })
            .catch((_)=>{
                 document.getElementById("form-message")
                .textContent="User Not Registered";
            });
    }


    logInClicked(event){
        event.preventDefault();
        let formObject =  document.getElementById('log-in-form');
        formObject = new FormData(formObject);
        try{
            let userName = formObject.get('usr_name');
            let userPassword = formObject.get('usr_password');
            LogInComponent.tryLogIn(userName, userPassword, "log-in-form");
        }
        catch (e) {
            alert(e);
            document.getElementById("form-message")
                .textContent="Log In Failed";
        }
    }


    render() {

        return (
            <div>
                <div className="container">
                                <form id="log-in-form" className="box" onSubmit={this.logInClicked}>
                                    <h1>Login</h1>
                                    <p className="text-muted"> Please enter your username and password!</p>
                                    <input type="text" name="usr_name" placeholder="Username" required/>
                                    <input type="password" name="usr_password" placeholder="Password" required/>
                                    <p id="form-message" className="text-danger text-center"></p>
                                    <input type="submit" name="" value="Login"/>
                                </form>

                </div>
            </div>
        )
    }
}

export default LogInComponent;