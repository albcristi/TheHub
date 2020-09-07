from ...models import AppUsers
from ...models import FriendList
from ...model.friendship_models_system.friendship_models import PendingFriendship
from ...service.PhoneMessagingService import PhoneMessagingSystem
from ...service.UserService import UserService
from django.utils.crypto import get_random_string


class FriendshipService:
    """
        Manages the relation between two AppUsers
        Meaning that 2 users can:
            - send friendship request
            - become friends
            - remove their friendship
    """
    def __init__(self):
        self.__message_service = PhoneMessagingSystem()
        self.__user_service = UserService()

    def __generate_token(self, length=5):
        return get_random_string(length)

    def remove_friendship(self, initiator_friend: AppUsers, other_friend: AppUsers) -> bool:
        try:
            initiator_friend\
                .current_friendships\
                .get(friend_with=other_friend)\
                .delete()

            other_friend\
                .current_friendships\
                .get(friend_with=initiator_friend)\
                .delete()
            return True
        except Exception:
            return False

    def create_friendship(self, initiator: AppUsers, other_friend: AppUsers) -> bool:
        try:
            friendship_to = FriendList(friendship_owner=initiator, friend_with=other_friend)
            friendship_to.save()
            friendship_from = FriendList(friendship_owner=other_friend, friend_with=initiator)
            friendship_from.save()
            return True
        except Exception:
            return False

    def accept_new_friendship(self, initiator: AppUsers, other_friend: AppUsers) -> bool:
        res = self.create_friendship(initiator, other_friend)
        message = "Hello, @"+other_friend.usr_name+"! We have good news, @"+initiator.usr_name+" has "+\
            "accepted your friendship request! TheHub Team"
        self.__message_service.send_new_message(other_friend.phone_number, message)
        return res

    def send_friendship_request(self, initiator: AppUsers, other_friend: AppUsers):
        try:
            new_pending_friendship = PendingFriendship()
            new_pending_friendship.friendship_initiator = initiator
            new_pending_friendship.requested_friend = other_friend
            new_pending_friendship.validation_token = self.__generate_token()
            new_pending_friendship.save()
            message = "Hello, @"+other_friend.usr_name+"! The following user @"+initiator.usr_name +\
                " sent you a friendship request!"
            self.__message_service.send_new_message(other_friend.phone_number, message)
            return True
        except Exception:
           return False

    def get_pending_friendships(self, user_name: str) -> list:
        try:
            user = self.__user_service.get_user_by_user_name(user_name)
            if user is None:
                return []
            pending_friendships = user.pending_friendships.all()
            pending_friends = [pending.friendship_initiator for pending in pending_friendships]
            return pending_friends
        except Exception:
            return []
