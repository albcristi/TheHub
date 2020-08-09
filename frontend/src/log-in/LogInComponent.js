import * as React from "react";
import axios from 'axios';
import './LogInComponentStyle.css';
const BASE_URL = 'http://localhost:8000/api';

class LogInComponent extends React.Component{
    constructor(props) {
        super(props);
    }



    tryLogIn(userName, userPassword){
        axios.post(`${BASE_URL}/do-log-in`,
            {
                user_name: userName,
                user_password: userPassword
            })
            .then((res)=>console.log(res))
            .catch((error)=>{});
    }


    logInClicked(user_name, password){

    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <form className="box">
                                    <h1>Login</h1>
                                    <p className="text-muted"> Please enter your username and password!</p> <input type="text" name="" placeholder="Username"/>
                                    <input type="password" name="" placeholder="Password"/>
                                    <input type="submit" name="" value="Login" href="#"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogInComponent;