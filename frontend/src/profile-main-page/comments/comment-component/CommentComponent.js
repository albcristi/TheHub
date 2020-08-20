import * as React from "react";


export class CommentComponent extends React.Component{

    state = {
        comment: null
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            comment: this.props.comment
        })
    }

    render(){

        return (
            <div>
                {this.state.comment.comment_text}
            </div>
        )
    }
}