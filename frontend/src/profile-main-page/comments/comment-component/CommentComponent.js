import * as React from "react";
import './CommentComponentStyle.css';

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
            <div className="comment-container">
                <p className="msg-user-own">@{this.state.comment.app_user}</p>
                <hr/>
                <p> {this.state.comment.comment_text} </p>
            </div>
        )
    }
}