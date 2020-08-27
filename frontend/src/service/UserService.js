import axios from "axios";


export class UserService{
     BASE_URL = 'http://localhost:8000/api/user/';

     checkUserNameUnicity(userName){
         return axios.get(
             `${this.BASE_URL}${userName}`
         );
     }

     getVerificationCodeByWhatssApp(user_name, phone_number){
         return axios.get(
             `${this.BASE_URL}account?phone_number=${phone_number}&user_name=${user_name}`
         )
     }
}