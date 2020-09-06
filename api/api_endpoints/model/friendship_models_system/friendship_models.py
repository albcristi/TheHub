from django.db import models

from ...models import AppUsers


class PendingFriendship(models.Model):
    friendship_initiator = models.ForeignKey(
        AppUsers,
        related_name="sent_friendships",
        on_delete=models.CASCADE)
    requested_friend = models.ForeignKey(
        AppUsers,
        related_name="pending_friendships",
        on_delete=models.CASCADE
    )
