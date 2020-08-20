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
