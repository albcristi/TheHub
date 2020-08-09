from django.db import models
from ...models import AppUsers


'''
    A post is created by a user and 
    is used in order for a user to 
    share its thoughts and emotions
'''


class Posts(models.Model):
    post_id = models.AutoField(primary_key=True)
    post_title = models.CharField(max_length=40)
    post_text = models.TextField()
    post_date = models.DateTimeField()
    is_public = models.BooleanField(default=False)
    user = models.ForeignKey(
        AppUsers,
        on_delete=models.CASCADE
    )
    no_likes = models.IntegerField(default=0)


'''
    Each Post may receive one or more
    likes from users (friends in the
    case of posts that are not public)    
'''


class PostLikes(models.Model):
    post = models.ForeignKey(
        Posts,
        on_delete=models.CASCADE
    )
    app_user = models.ForeignKey(
        AppUsers,
        on_delete=models.CASCADE
    )


'''
    A PostComment appears when a user
    that sees a post wants to add a 
    remark regarding that specific post
'''


class PostComments(models.Model):
    post = models.ForeignKey(
        Posts,
        on_delete=models.CASCADE
    )
    app_user = models.ForeignKey(
        AppUsers,
        on_delete=models.CASCADE
    )
    comment_text = models.CharField(max_length=300)
    comment_date = models.DateTimeField()
    no_likes = models.IntegerField(default=0)


'''
    Whenever a user sees a comment of a certain
    post, he/she can give that comment a like
'''


class CommentLikes(models.Model):
    post_comment = models.ForeignKey(
        PostComments,
        on_delete=models.CASCADE
    )
    app_user = models.ForeignKey(
        AppUsers,
        on_delete=models.CASCADE
    )
