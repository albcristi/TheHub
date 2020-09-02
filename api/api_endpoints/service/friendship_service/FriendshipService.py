from ...models import AppUsers
from ...models import FriendList

class FriendshipService:
    """
        Manages the relation between two AppUsers
        Meaning that 2 users can:
            - send friendship request
            - become friends
            - remove their friendship
    """

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
