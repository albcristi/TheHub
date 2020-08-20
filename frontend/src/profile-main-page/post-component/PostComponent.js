import * as React from "react";

export class PostComponent extends React.Component{

    constructor(props){
        super(props);
        console.log(this.state)
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
                            <div style={{marginLeft: "0.5vw"}}>
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