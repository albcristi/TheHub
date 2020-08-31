import * as React from "react";
import axios from 'axios';
import './LogInComponentStyle.css';


const HOST = process.env.REACT_APP_HOST_URL;
const PORT = process.env.REACT_APP_PORT_API;
const BASE_URL = `${HOST}:${PORT}/api`;


class LogInComponent extends React.Component{

    constructor(props) {
        super(props);
    }


    executeUserLogIn = (userName, userPassword, failedMessageID)=>{
        axios.post(`${BASE_URL}/do-log-in`,
            {
                user_name: userName,
                user_password: userPassword
            })
            .then((response) => {
                let logInResponse = response.data.cred_verified;
                if(logInResponse){
                    let sessionToken = response.data.token;
                    sessionStorage.setItem('user_name', userName);
                    sessionStorage.setItem('token', sessionToken);
                    sessionStorage.setItem('isLogged', 'true');
                    console.log(sessionStorage.getItem('isLogged'));
                    window.location='/profile';
                    return;
                }
                document.getElementById(failedMessageID)
                        .textContent="Wrong user name or/and password";

            })
            .catch((e)=>{
                 console.log(e);
                 document.getElementById("form-message")
                .textContent="User Not Registered";
            });
    };


    logInClicked = (event)=>{
        event.preventDefault();
        let formObject =  document.getElementById('log-in-form');
        formObject = new FormData(formObject);
        try{
            let userName = formObject.get('usr_name');
            let userPassword = formObject.get('usr_password');
            this.executeUserLogIn(userName, userPassword, "form-message");
        }
        catch (e) {
            alert(e);
            document.getElementById("form-message")
                .textContent="Log In Failed";
        }
    };

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