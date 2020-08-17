import * as React from "react";
import './NewPostAccessStyle.css';
import ToggleComponent from "../../ToggleComponent";
import {PostService} from "../../service/post-system/PostService";

export class NewPostAccessComponent extends React.Component{
    postService = new PostService();
    constructor(props){
        super(props);
    }


    createPostClicked(call_back_function){
        try {
            let post_title = document.getElementById("new-post-title").textContent;
            let post_text = document.getElementById("new-post-content").textContent;
            console.log(post_text+post_title);
            if(post_title.length < 3 || post_text.length < 3){
                throw "Title and post content need to be longer than 3 chars! :D"
            }
            this.postService.create_new_post(post_title, post_text);
            call_back_function();
        }
        catch (e) {
            document.getElementById("new-post-content").innerText = e;
        }
    }

    render() {
        let today = new Date().toISOString().slice(0, 10);
        return(
            <div>
                <ToggleComponent>
                    {({showContent, changeDisplayProperty}) => (
                        <div>
                            {showContent && <div className="card new-post-access-card" >
                                <div className="card-body">
                                    <h5 className="card-title">Hey, @{sessionStorage.getItem("user_name")}!</h5>
                                    <div className="intro-new-post-div">
                                        <div>
                                            <span onClick={changeDisplayProperty}>What's on your mind?</span>
                                        </div>
                                    </div>
                                    <div className="container d-flex justify-content-between">

                                    </div>
                                    <h6  style={{marginTop: "2vh"}} className="card-subtitle mb-2 text-muted">{today}</h6>
                                </div>
                            </div>
                            }
                            {! showContent && <div>
                                <div className="container new-post-creation-container">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <span id="new-post-title" contentEditable={true}>
                                                    Give me a title :)
                                                </span>
                                            </h5>
                                            <hr/>
                                            <p className="card-text">
                                                <span id="new-post-content" contentEditable={true}>
                                                    Is it about going somewhere new? Or maybe
                                                    you want to invite everyone over for the weekend.
                                                    Post your thoughts now, see what your friends think!
                                                    Edit me :)
                                                </span>
                                            </p>
                                            <hr/>
                                            <a href="#" onClick={(e) => this.createPostClicked(changeDisplayProperty)} className="card-link">Create Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    )}
                </ToggleComponent>
            </div>
        )
    }
}
