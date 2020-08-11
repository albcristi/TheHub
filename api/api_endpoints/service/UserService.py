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
            return AppUsers(usr_id=-1)
