import * as React from "react";
import {PendingFriendshipComponent} from "../pending-friendship-component/PendingFriendshipComponent";

export class ListPendingFriendshipsComponent extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        userName: "",
        pendingFriendships: []
    };

    componentWillMount() {
        const {userName} = this.props;
        this.setState({
            userName: userName
        })
    }

    render() {

        return (
            <div>
                <div>
                    <h4>Pending friendships</h4>
                </div>
                { this.state.pendingFriendships.length > 0 &&
                    <div className="container d-flex justify-content-center pend-friend-list-container">
                        <div className="container d-flex flex-column left-container">
                            {
                                this.state.pendingFriendships
                                    .map((value, index) => (
                                            <div key={`left-${index}`}>
                                                {index % 2 === 0 &&
                                                    <div>
                                                    </div>
                                                }
                                            </div>
                                    ))
                            }
                        </div>

                        <div className="container d-flex flex-column right-container">
                             {
                                this.state.friends
                                    .map((value, index) => (
                                            <div key={`right-${index}`}>
                                                { index%2===1 &&
                                                    <div>
                                                    </div>
                                                }
                                            </div>
                                    ))
                            }
                        </div>
                    </div>
                }
                {this.state.pendingFriendships.length === 0 &&
                    <div>
                        <h4 className="text-secondary">
                            There are no pending request found for the moment
                        </h4>
                    </div>
                }
            </div>
        )
    }
}