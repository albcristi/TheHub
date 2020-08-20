import * as React from "react";
import {PostService} from "../../../service/post-system/PostService";
import {CommentComponent} from "../comment-component/CommentComponent";


export class CommentListComponent extends React.Component{

    state = {
        comments: [],
        post_id: -1
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
                this.setState({
                    comments: r.data.comments,
                    post_id: post_id
                })
            })
            .catch((_)=>{})
    }

    render() {

        return(
            <div>
                {
                    this.state.comments.map(
                        (val, ind) => {
                            return (
                                <CommentComponent key={`comm-list-${val.id}`} comment={val}/>
                            )
                        }
                    )
                }
                {this.state.comments.length === 0 &&
                <small className="text-danger">No Comments</small>}
            </div>
        )
    }
}