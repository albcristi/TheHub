

export class UserDataValidator{
    constructor() {
    }

    USER_EMAIL_PATTERN = new RegExp('[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+');


    USER_BIRTH_DATE_PATTERN_1 = new RegExp('^[1-9][0-9]{3}-[0-9][1-9]-[0-9][1-9]$');

    USER_BIRTH_DATE_PATTERN_2 = new RegExp('^[1-9][0-9]{3}-[1-9][0-9]-[1-9][0-9]$');

    USER_PHONE_NUMBER_PATTERN = new RegExp('^[0-9]+$');

    checkUserEmail(userEmail){
        return this.USER_EMAIL_PATTERN.test(userEmail);
    }

    checkBirthDate(birthDate){
        return this.USER_BIRTH_DATE_PATTERN_1.test(birthDate) || this.USER_BIRTH_DATE_PATTERN_2.test(birthDate);
    }

    checkPhoneNumber(phoneNumber){
        return this.USER_PHONE_NUMBER_PATTERN.test(phoneNumber);
    }
}