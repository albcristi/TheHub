import axios from 'axios';

export class FriendshipService {
    toHost = `${process.env.REACT_APP_HOST_URL}:${process.env.REACT_APP_PORT_API}`;

    constructor() {
    }

    removeFriendship(initiatorFriend, otherFriend){
        return axios.delete(
            `${this.toHost}/api/relations/initiator=${initiatorFriend}/other=${otherFriend}/${sessionStorage.getItem('token')}`
        );
    }

    restoreFriendship(initiatorFriend, otherFriend){
        return axios.post(
            `${this.toHost}/api/relations/initiator=${initiatorFriend}/other=${otherFriend}/${sessionStorage.getItem('token')}`
        );
    }


    retrieverPendingFriends(userName){
        return axios.get(
            `${this.toHost}/api/relations/pending-friendships/${userName}/${sessionStorage.getItem('token')}`
        );
    }

    acceptPendingFriendship(userName){
        return axios.put(
            `${this.toHost}/api/relations/initiator=${userName}/other=${sessionStorage.getItem('user_name')}/${sessionStorage.getItem('token')}`
        )
    }

    declinePendingFriendship(userName){
        const other = sessionStorage.getItem('user_name');
        const token = sessionStorage.getItem('token')
        return axios.delete(
            `${this.toHost}/api/relations/pending-friendships/${userName}/other${other}/${token}`
        )
    }
}