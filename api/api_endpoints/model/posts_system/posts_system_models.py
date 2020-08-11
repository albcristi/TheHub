from django.db import models

from ...models import AppUsers


class Posts(models.Model):
    """
        A post is created by a user and
        is used in order for a user to
        share its thoughts and emotions
    """

    post_id = models.AutoField(primary_key=True)
    post_title = models.CharField(max_length=40)
    post_text = models.TextField()
    post_date = models.DateTimeField()
    is_public = models.BooleanField(default=False)
    user = models.ForeignKey(
        AppUsers,
        related_name='user_posts',
        on_delete=models.CASCADE
    )
    no_likes = models.IntegerField(default=0)

    def __str__(self):
        return str(self.post_title)


class PostLikes(models.Model):
    """
        Each Post may receive one or more
        likes from users (friends in the
        case of posts that are not public)
    """

    post = models.ForeignKey(
        Posts,
        related_name='post_likes',
        on_delete=models.CASCADE
    )
    app_user = models.ForeignKey(
        AppUsers,
        related_name='likes_post',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "Post "+str(self.post)+" liked by "+str(self.app_user)


class PostComments(models.Model):
    """
        A PostComment appears when a user
        that sees a post wants to add a
        remark regarding that specific post
    """

    post = models.ForeignKey(
        Posts,
        related_name='related_post',
        on_delete=models.CASCADE
    )
    app_user = models.ForeignKey(
        AppUsers,
        related_name='user_post_comments',
        on_delete=models.CASCADE
    )
    comment_text = models.CharField(max_length=300)
    comment_date = models.DateTimeField()
    no_likes = models.IntegerField(default=0)

    def __str__(self):
        return str(self.comment_text)


class CommentLikes(models.Model):
    """
        Whenever a user sees a comment of a certain
        post, he/she can give that comment a like
    """

    post_comment = models.ForeignKey(
        PostComments,
        related_name='comment_likes',
        on_delete=models.CASCADE
    )
    app_user = models.ForeignKey(
        AppUsers,
        related_name='user_comment_likes',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "Comment "+str(self.post_comment)+" liked by "+str(self.app_user)
