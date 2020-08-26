import axios from "axios";


export class UserService{
     BASE_URL = 'http://localhost:8000/api/user/';

     checkUserNameUnicity(userName){
         return axios.get(
             `${this.BASE_URL}${userName}`
         );
     }
}