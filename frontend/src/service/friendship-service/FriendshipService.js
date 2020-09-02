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
}