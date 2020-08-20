import * as React from "react";
import ToggleComponent from "../../ToggleComponent";
import {LikeListComponent} from "../likes/like-list/LikeListComponent";
import {PostService} from "../../service/post-system/PostService";
import './PostComponentStyle.css';

export class PostComponent extends React.Component{

    state = {
        postDetails: null
    };

    constructor(props){
        super(props);
    }

    niceDateFormat(date){
        let year_month_day = new Date(date).toDateString();
        let hour = new Date(date).getHours();
        let minutes = new Date(date).getMinutes();
        return `${year_month_day} ${hour}:${minutes}`;
    }

    componentWillMount() {
        const {postDetail} = this.props;
        this.setState(
            {
                postDetails: postDetail
            }
        )
    }


    userLikesPostAction(postDetail){
        let postService = new PostService();

        postService.giveLike(
            postDetail.post_id,
            sessionStorage.getItem('user_name')
        )
            .then(
                (res) => {
                    if(res.data.msg === true){
                       let newPostDetails = this.state.postDetails;
                       newPostDetails.no_likes += 1;
                       this.setState({
                           postDetails: newPostDetails
                       })

                    }
                }
            )
            .catch((_) => {});
    }
    render() {

        return (
            <div style={{marginTop: "2vh", marginBottom: "2vh"}}>
                <div className="card" style={{borderRadius: "10px"}}>
                    <div>
                        <div className="card-title">
                           <p>"{this.state.postDetails.post_title}"</p>
                        </div>
                    </div>
                    <div className="card-text">
                        {this.state.postDetails.post_text}
                    </div>
                    <small>Posted on {this.niceDateFormat(this.state.postDetails.post_date)} by {this.state.postDetails.user}</small>
                    <div className="card-footer" style={{borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px"}}>
                        <div className="d-flex justify-content-center">
                            <div>
                                <svg onClick={() => {this.userLikesPostAction(this.state.postDetails)}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill"
                                     fill="red" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                            </div>
                            <ToggleComponent>
                                {({showContent, changeDisplayProperty}) => (
                                     <div>
                                        <div onClick={changeDisplayProperty} style={{marginLeft: "0.5vw"}}>
                                            { this.state.postDetails.no_likes === 0 &&
                                            <p className="text"> no likes</p>
                                            }
                                            { this.state.postDetails.no_likes>0 &&
                                            <p className="no-likes-text" >
                                                {this.state.postDetails.no_likes}
                                                {this.state.postDetails.no_likes>1 ? 'likes' : 'like'}
                                            </p>
                                            }
                                        </div>
                                         {this.state.postDetails.no_likes > 0 &&
                                             <div>
                                                 {!showContent &&
                                                 <LikeListComponent post_id={this.state.postDetails.post_id}/>
                                                 }
                                             </div>
                                         }
                                     </div>
                                )}
                            </ToggleComponent>
                            <div style={{marginLeft: "0.5vw"}}>
                                {/*
                                    TODO: introduce toggle component
                                    in order to show available components
                                   */
                                }
                                <p className="comments-text">Comments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}