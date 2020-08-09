import * as React from "react";


class ProfileUserInformationComponent extends React.Component{

    render() {
        return (
            <div>
                <div className="card">
                    <p>Hello, {sessionStorage.getItem('user_name')}!</p>
                </div>
            </div>
        )
    }
}

export default ProfileUserInformationComponent;