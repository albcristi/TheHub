import * as React from "react";
import {PostService} from "../../../service/post-system/PostService";
import {LikeComponent} from "../like-component/LikeComponent";


export class LikeListComponent extends React.Component{

    state = {
        likesList: [],
        isReady: false
    };

    constructor(props){
        super(props);
        const {post_id} = props;
        let postService = new PostService();
        postService.retrieveLikes(post_id)
            .then((result) => this.setState({
                likesList: result.data.likes,
                isReady: true
            }))
            .catch((error) => console.log(error));
    }

    render() {
        const {post_id} = this.props;
        return (
            <div>
                {
                    this.state.isReady &&
                        this.state.likesList.map(
                            (val, ind) =>{
                                return (
                                        <div key={`${post_id}-${val}`}>
                                            <LikeComponent userName={val}/>
                                        </div>
                                )
                            }
                        )
                }
            </div>
        )
    }

}