import * as React from "react";
import './RegisterComponentStyle.css';

class RegisterComponent extends React.Component{


    constructor(props){
        super(props);
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
                                <input type="text" name="usr_name" placeholder="Username" required/>
                                <input type="password" name="usr_password" placeholder="Password" required/>
                                <input type="password" name="re_usr_password" placeholder="Enter password again" required/>
                                <input type="text" name="phone-number" placeholder="Phone Number" required/>
                                <p id="form-message" className="text-danger text-center"></p>
                                <input type="submit" name="" value="Register"/>
                            </form>

            </div>
        )
    }
}

export default RegisterComponent;