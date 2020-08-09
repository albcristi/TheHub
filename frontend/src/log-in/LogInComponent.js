import * as React from "react";
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

class LogInComponent extends React.Component{

    constructor(props){
        super(props);
    }

    tryLogIn(userName, userPassword){
        axios.get(BASE_URL)
            .then((res)=>console.log(res))
            .catch((error)=>{});
    }


    render() {
        this.tryLogIn('','');

        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">
                    Login
                </div>
                <div className="content">
                      <div className="image">
                      </div>
                      <div className="form">
                        <div className="form-group">
                          <input type="text" name="username" placeholder="email" />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" placeholder="password" />
                        </div>
                      </div>
                </div>
                <div className="footer">
                  <button  style={{borderRadius: 5}} type="button" className="button">
                    Login
                  </button>
            </div>
          </div>
        )
    }
}

export default LogInComponent;