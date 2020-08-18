import * as React from "react";
import {PostComponent} from "../post-component/PostComponent";
import {PostService} from "../../service/post-system/PostService";


export class PostListComponent extends React.Component{

    state = {
        pageNo: 1,
        activePosts: [],
        isReady: false
    };

    constructor(props) {
        super(props);
        const p = new PostService();
        p
            .retrieve_related_posts(1,5)
            .then((res)=>{
                this.setState({pageNo: this.state.pageNo,
                    activePosts: res.data.result,
                    isReady: true})
            })
            .catch((_)=>{});
    }

    render() {

        return (
            <div>
                { this.state.isReady &&
                    this.state.activePosts.map(
                        (val, index) =>{
                            return (
                                <div key={index}>
                                    <PostComponent postDetail={val} />
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }

}