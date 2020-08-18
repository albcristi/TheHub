import axios from 'axios';

const BASE_URL_POSTs = 'http://localhost:8000/api/posts/';

export class PostService {
    constructor(){}

    create_new_post(post_title, post_text){
        try{
            let session_token = sessionStorage.getItem('token');
            axios.post(
                BASE_URL_POSTs,
                {
                    token: session_token,
                    post_title: post_title,
                    post_text: post_text
                }

            )
            .then( (res) =>{
                    console.log(res);
                })
                .catch((er) =>{
                    alert(er);
                })

        }
        catch (e) {
            console.log(e)
        }
    }

    retrieve_related_posts(page_no, no_per_page){
        const token = sessionStorage.getItem('token');
        return axios.
            get(
                `${BASE_URL_POSTs}?token=${token}&page=${page_no}&no_per=${no_per_page}`
            );
    }
}