import * as React from "react";
import './NewPostAccessStyle.css';
import ToggleComponent from "../../ToggleComponent";

export class NewPostAccessComponent extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        let today = new Date().toISOString().slice(0, 10);
        return(
            <div>
                <ToggleComponent>
                    {({showContent, changeDisplayProperty}) => (
                        <div>
                            {showContent && <div className="card new-post-access-card" >
                                <div className="card-body">
                                    <h5 className="card-title">Hey, @{sessionStorage.getItem("user_name")}!</h5>
                                    <div className="intro-new-post-div">
                                        <div>
                                            <span onClick={changeDisplayProperty}>What's on your mind?</span>
                                        </div>
                                    </div>
                                    <div className="container d-flex justify-content-between">

                                    </div>
                                    <h6  style={{marginTop: "2vh"}} className="card-subtitle mb-2 text-muted">{today}</h6>
                                </div>
                            </div>
                            }
                            {! showContent && <div><p>The New Post Text Area Should be here</p></div>}
                        </div>
                    )}
                </ToggleComponent>
            </div>
        )
    }
}
