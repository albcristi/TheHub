from typing import Optional

from ..models import AppUsers


class UserService:
    """"
        Class that will handle different operations
        on users:
            - CRUDs
            - filtering
            - etc..
    """

    def get_user(self, user_id: int) -> Optional[AppUsers]:
        try:
            usr = AppUsers.objects.get(usr_id=user_id)
            return usr
        except Exception:
            None

    def get_user_friends(self, user_name: str):
        try:
            usr = AppUsers.objects.get(usr_name=user_name)
            return usr.current_friendships.all()
        except Exception as e:
            return []

    def get_user_by_user_name(self, user_name) -> Optional[AppUsers]:
        try:
            usr = AppUsers.objects.get(usr_name=user_name)
            return usr
        except Exception:
            return None

    def username_is_unique(self, user_name: str) -> bool:
        try:
            usrs = AppUsers.objects.filter(usr_name__exact=user_name)
            return usrs.count() == 0
        except Exception as e:
            print(e)
            return False

    def create_user(self, user_name: str, user_password: str, email: str, phone_number: str) -> bool:
        if not self.username_is_unique(user_name):
            return False

