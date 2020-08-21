import * as React from "react";
import {PostService} from "../../../service/post-system/PostService";
import {CommentComponent} from "../comment-component/CommentComponent";
import ToggleComponent from "../../../ToggleComponent";
import {LikeComponent} from "../../likes/like-component/LikeComponent";
import jQuery from 'jquery';

export class CommentListComponent extends React.Component{

    state = {
        comments: [],
        post_id: -1,
        shown_comments: [],
        current_index: -1
    };

    constructor(props){
        super(props);
        let p = new PostService();
        p.retrieveComments(3)
            .then((r) => console.log(r))
            .catch((_)=>{})
    }

    componentWillMount() {
        const {post_id} = this.props;
        let postService = new PostService();
        postService.retrieveComments(post_id)
            .then((r) => {
                let comments = r.data.comments;
                comments.sort((com1, com2) => com1.id - com2.id);
                let shown_components = [];
                comments.length < 4 ? shown_components = comments : shown_components = comments.slice(0, 3);
                this.setState({
                    comments: comments,
                    post_id: post_id,
                    shown_comments: shown_components,
                    current_index: shown_components.length
                });
                console.log(this.state);
            })
            .catch((_)=>{})
    }

    showMoreComments(){
        /* Reveals the next 3 comments
        from a post
        * */
        let more_components = this.state.comments.slice(this.state.current_index, this.state.current_index+3);
        this.setState({
            comments: this.state.comments,
            post_id: this.state.post_id,
            shown_comments: this.state.shown_comments.concat(more_components),
            current_index: this.state.current_index+3
        });
    }

    render() {

        return(
            <div>

                {
                    this.state.shown_comments.map(
                        (val, ind) => {
                            return (
                                <CommentComponent key={`comm-list-${val.id}`} comment={val}/>
                            )
                        }
                    )
                }
                {this.state.comments.length === 0 &&
                <small className="text-danger">No Comments</small>}
                { (this.state.current_index < this.state.comments.length && this.state.comments.length > 3)  &&
                            <div>
                                <small onClick={() => this.showMoreComments()}>Show More Comments</small>
                            </div>
                }

                {
                    this.state.current_index >= this.state.comments.length &&
                        <div>
                            <small onClick={() => this.hideComments()}>Hide Comments</small>
                        </div>
                }
            </div>
        )
    }

    hideComments() {
        this.setState({
            comments: this.state.comments,
            post_id: this.state.post_id,
            shown_comments: [],
            current_index: 0
        })
    }
}