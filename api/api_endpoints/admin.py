from django.contrib import admin

# Register your models here.
from .model.posts_system.posts_system_models import Posts, PostLikes, PostComments, CommentLikes
from .models import AppUsers, UserSession, FriendList
from .model.friendship_models_system.friendship_models import PendingFriendship

admin.site.register(AppUsers)
admin.site.register(UserSession)
admin.site.register(Posts)
admin.site.register(PostLikes)
admin.site.register(PostComments)
admin.site.register(CommentLikes)
admin.site.register(FriendList)
admin.site.register(PendingFriendship)
