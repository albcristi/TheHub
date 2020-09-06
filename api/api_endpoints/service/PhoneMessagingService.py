
import os
from twilio.rest import Client
from django.utils.crypto import get_random_string


def send_verification_code_to_new_user(user_phone_number: str, user_name: str):
    phone_no = os.environ['PHONE_NUMBER']
    account_sid = os.environ['ACCOUNT_SID']
    val_auth_token = os.environ['AUTH_TOKEN']
    client = Client(account_sid, val_auth_token)
    access_key = get_random_string(5)
    message = client.messages.create(
        from_='whatsapp:'+phone_no,
        body='Hello, '+user_name+'! Welcome to the Hub! This is your authorization code: ' +access_key,
        to='whatsapp:+'+user_phone_number
    )
    return access_key


class PhoneMessagingSystem:
    def __init__(self):
        account_sid = os.environ['ACCOUNT_SID']
        self.__phone_number = 'whatsapp:'+os.environ['PHONE_NUMBER']
        val_auth_token = os.environ['AUTH_TOKEN']
        self.__client = Client(account_sid, val_auth_token)

    def send_new_message(self, phone: str, message: str):
        self.__client.messages.create(
            from_=self.__phone_number,
            body=message,
            to='whatsapp:'+phone
        )
