import * as React from "react";
import './ValidationAccountComponentStyle.css';

export class ValidationAccountComponent extends React.Component{

    constructor(props){
        super(props);
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
                        <p>Add {sessionStorage.getItem('phone_number')} <br/> to your contacts</p>
                        <hr/>
                        <p className="text-info" style={{fontSize: "15px"}}>Second Step</p>
                        <p>Send the following message on WhatsApp
                        </p>
                        <small>join cowboy-must</small>
                         <hr/>
                        <p className="text-info" style={{fontSize: "15px"}}>Third Step</p>
                        <p class="verif-link">Sent Verification Code</p>
                        <input placeholder="Access Key"/>
                        <button className="btn btn-primary">Verify Code</button>
                    </div>
                </div>
            </div>
        );
    }
}
