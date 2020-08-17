from typing import Optional

from ..models import UserSession, AppUsers
from datetime import datetime

class SessionService:
    """"
        Service that will handle user session
        related actions:
            - retrieve session by session token
            - retrieve user by session token
            - terminate existing session
            - etc..
    """

    def retrieve_session(self, session_token: str)-> Optional[UserSession]:
        sessions = UserSession.objects.filter(token=session_token)
        if sessions.count() == 0:
            return None
        return sessions[0]

    def retrieve_user_by_session_token(self, session_token: str)-> Optional[AppUsers]:
        user_session = self.retrieve_session(session_token)
        if user_session is None:
            return None
        return user_session.user

    def terminate_session(self, session_token: str)-> bool:
        """"
            :parameter session_token: str - Session Token Value
            :return bool

            Ends the session corresponding to @session_token
            Returns:
                - true if a session exists and its successfully
                removed
                - false if there is no session with the given
                @session_token, or delete operation fails

        """
        existing_session = self.retrieve_session(session_token)
        if existing_session is None:
            return False
        try:
            existing_session.delete()
        except Exception:
            return False
        return True

    def update_session_data(self, session: UserSession):
        session.started_at = datetime.now()
        session.save()

    def token_validation(self, token: str)->bool:
        if self.retrieve_session(token) is None:
            return False
        return True
