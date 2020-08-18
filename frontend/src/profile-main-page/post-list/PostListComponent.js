import * as React from "react";


export class PostListComponent extends React.Component{

    state = {
        existingPosts: []
    };


    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <p>Hey There :D</p>
            </div>
        )
    }

}