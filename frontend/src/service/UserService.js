import axios from "axios";

const HOST = process.env.REACT_APP_HOST_URL;
const PORT = process.env.REACT_APP_PORT_API;

export class UserService{
     BASE_URL = `${HOST}:${PORT}/api/user/`;

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


     createNewAccount(userName, password, phone, email){
         return axios.post(
             `${this.BASE_URL}new-account`,
             {
                 user_name: userName,
                 password: password,
                 phone_number: phone,
                 email: email
             }
         )
     }

     logOutUser(){
        return axios.post(
            `${this.BASE_URL}log-out`,
            {
                token: sessionStorage.getItem('token')
            }
        )
     }
}