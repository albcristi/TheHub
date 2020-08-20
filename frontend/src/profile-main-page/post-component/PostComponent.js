import * as React from "react";
import ToggleComponent from "../../ToggleComponent";
import {LikeListComponent} from "../likes/like-list/LikeListComponent";

export class PostComponent extends React.Component{

    constructor(props){
        super(props);
    }

    niceDateFormat(date){
        let year_month_day = new Date(date).toDateString();
        let hour = new Date(date).getHours();
        let minutes = new Date(date).getMinutes();

        return `${year_month_day} ${hour}:${minutes}`;
    }

    render() {
        const {postDetail} = this.props;

        return (
            <div style={{marginTop: "2vh", marginBottom: "2vh"}}>
                <div className="card" style={{borderRadius: "10px"}}>
                    <div>
                        <div className="card-title">
                           <p>"{postDetail.post_title}"</p>
                        </div>
                    </div>
                    <div className="card-text">
                        {postDetail.post_text}
                    </div>
                    <small>Posted on {this.niceDateFormat(postDetail.post_date)} by {postDetail.user}</small>
                    <div className="card-footer" style={{borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px"}}>
                        <div className="d-flex justify-content-center">
                            <div>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill"
                                     fill="red" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                            </div>
                            <ToggleComponent>
                                {({showContent, changeDisplayProperty}) => (
                                     <div>
                                        <div onClick={changeDisplayProperty} style={{marginLeft: "0.5vw"}}>
                                            { postDetail.no_likes === 0 &&
                                            <p className="text"> no likes</p>
                                            }
                                            { postDetail.no_likes>0 &&
                                            <p className="text">
                                                {postDetail.no_likes}
                                                {postDetail.no_likes>1 ? 'likes' : 'like'}
                                            </p>
                                            }
                                        </div>
                                         {postDetail.no_likes > 0 &&
                                             <div>
                                                 {!showContent &&
                                                 <LikeListComponent post_id={postDetail.post_id}/>
                                                 }
                                                 {!showContent &&
                                                 <svg onClick={changeDisplayProperty} width="1em" height="1em"
                                                      viewBox="0 0 16 16"
                                                      className="bi bi-caret-up" fill="currentColor"
                                                      xmlns="http://www.w3.org/2000/svg">
                                                     <path fillRule="evenodd"
                                                           d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
                                                 </svg>}
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
                                <p className="text">Comments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}