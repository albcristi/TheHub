import * as React from "react";


export class LikeComponent extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const {userName} = this.props;
        return (
            <div>
                <p>@{userName}</p>
            </div>
        )
    }
}
