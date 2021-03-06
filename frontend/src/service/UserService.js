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

     getUserProfileInformation(userName){
         const token = sessionStorage.getItem('token');
         return axios.get(
             `${this.BASE_URL}profile-info?token=${token}&user=${userName}`
         );
     }

     getFriends(userName){
         const token = sessionStorage.getItem('token');
         return axios.get(
             `${this.BASE_URL}friendships/${userName}?token=${token}`
         );
     }

     updateUserProfile(email, birthDate, phoneNumber){
        return axios.post(
            `${this.BASE_URL}manage-account`,
            {
                token: sessionStorage.getItem('token'),
                email: email,
                phone_number: phoneNumber,
                birth_date: birthDate,
            }
            ,
            {
            }

        );
     }

     updateProfilePicture(profilePicture) {
         let form = new FormData();
         form.append('profile-image-file', profilePicture);
         form.append('profile-image-name', profilePicture.name);
         form.append('token', sessionStorage.getItem('token'))
         return axios.post(
             `${this.BASE_URL}manage-profile-picture`,
             form,
             {
                 headers: {
                     "Content-type": "multipart/form-data",
                 }
             });
     }
}