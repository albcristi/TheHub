import * as React from "react";
import {PostComponent} from "../post-component/PostComponent";
import {PostService} from "../../service/post-system/PostService";
import './PostListStyle.css';

export class PostListComponent extends React.Component{

    state = {
        pageNo: 1,
        activePosts: [],
        isReady: false,
        noPerPage: 3,
        hasMore: true
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const p = new PostService();
        p
            .retrieve_related_posts(this.state.pageNo, this.state.noPerPage)
            .then((res)=>{
                let posts = res.data.result;
                posts.sort((post1, post2) => post2.post_id - post1.post_id);
                this.setState({
                    pageNo: this.state.pageNo+1,
                    activePosts: posts,
                    isReady: true,
                    noPerPage: this.state.noPerPage,
                    hasMore: posts.length > 0})

            })
            .catch((_)=>{});

    }


    loadMorePosts(state){
        let postService = new PostService();
        postService.retrieve_related_posts(state.pageNo, state.noPerPage)
            .then((res) =>{
                let posts = res.data.result;
                posts.sort((post1, post2) => post2.post_id - post1.post_id);
                this.setState({
                    pageNo: state.pageNo+1,
                    activePosts: [...state.activePosts, ...posts],
                    isReady: true,
                    noPerPage: state.noPerPage,
                    hasMore: posts.length > 0

                });
                 console.log(posts)
            })
            .catch((_)=>{})
    }

    render() {

        return (
            <div>
                <div id="list-of-post">
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
                {this.state.hasMore &&
                    <div style={{paddingTop: "10px", paddingBottom: "20px"}}>
                        <svg onClick={()=>{this.loadMorePosts(this.state)}} id="show-more-posts-svg" width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-arrow-down-circle"
                             fill="gray" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fillRule="evenodd"
                                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </div>
                }
                {!this.state.hasMore &&
                    <div style={{paddingTop: "10px", paddingBottom: "20px"}} className="text-center text-info">
                        <h4>There are no other posts available for the moment</h4>
                    </div>
                }
            </div>
        )
    }

}