import * as React from "react";
import {PostService} from "../../../service/post-system/PostService";
import {LikeComponent} from "../like-component/LikeComponent";
import jQuery from 'jquery';

export class LikeListComponent extends React.Component{

    state = {
        likesList: [],
        isReady: false,
        post_id: -1
    };

    constructor(props){
        super(props);

    }

    componentWillMount() {
         let postService = new PostService();
         const {post_id} = this.props;
         postService.retrieveLikes(post_id)
            .then((result) => this.setState({
                likesList: result.data.likes,
                isReady: true,
                post_id: post_id
            }))
            .catch((error) => console.log(error));
    }

    componentDidMount() {
         window.jQuery(`#like-modal${this.state.post_id}`).modal('show')
    }

    render() {
        const {post_id} = this.props;
        return (
            <div>
                <div className="modal fade" id={`like-modal${this.state.post_id}`} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">People who like this post</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.isReady &&
                                    this.state.likesList.map(
                                        (val, ind) =>{
                                            return (
                                                    <div key={`${post_id}-${val}`} style={{marginLeft: "1vw"}}>
                                                        <LikeComponent userName={val}/>
                                                    </div>
                                            )
                                        }
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }

}