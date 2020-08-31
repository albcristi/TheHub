from ...models import AppUsers
from ...model.posts_system.posts_system_models import Posts, PostLikes, PostComments
from datetime import datetime
from ..UserService import UserService
from django.core.paginator import Paginator


class PostService:
    def __init__(self):
        self.__user_service = UserService()

    def create_post(self, title: str, text_content: str, created_by: AppUsers) -> str:
        try:
            post = Posts()
            post.is_public = False
            post.no_likes = 0
            post.post_title = title
            post.post_text = text_content
            post.user = created_by
            post.post_date = datetime.now()
            post.save()
        except Exception as e:
                return str(e)
        return str(post)

    def return_post_from_friends(self, user_name: str, page_no: int, no_per_page: int):
        """
            Retrieves the posts made by a certain user and its friends
            Pagination is being used in order to retrieve those posts
            that are placed the page specified by 'page_no' param. when
            there are X records per page, X being specified by 'no_per_page'
            parameter.
            The records are ordered descending based on the date they were
            posted and their ids
        """
        friend_list = self.__user_service.get_user_friends(user_name)
        friend_list = [friend.friend_with for friend in set(friend_list)]
        friend_list.append(self.__user_service.get_user_by_user_name(user_name))
        try:
            posts = Posts.objects.\
                filter(user__in=friend_list).\
                order_by('-post_date', '-post_id')
            paginator = Paginator(posts, no_per_page)
            result = paginator.page(page_no)\
                .object_list
            return result
        except Exception as e:
            return []

    def return_post_likes(self, post_id: int) -> list:
        """
            This method takes as a parameter the id of
            a post and returns the list of with users that
            like that specific post. In case the post_id is
            not valid, the result returned will be the
            empty list
        """
        try:
            post = Posts.objects.get(post_id=post_id)
            likes = set(post.post_likes.all())
            user_that_likes_post = []
            [user_that_likes_post.append(like.app_user.usr_name) for like in likes]
            return user_that_likes_post
        except Exception:
            return []

    def like_post(self, post_id: int, user: AppUsers) -> bool:
        """
            In case user did not like the post identified
            by post_id, a like will be added to the post
            and also a new LikePost record will be added
        """
        try:
            post = Posts.objects.get(post_id=post_id)
            if user.usr_name in self.return_post_likes(post_id):
                return False
            post_like = PostLikes()
            post_like.post = post
            post_like.app_user = user
            post_like.save()
            post.no_likes += 1
            post.save()
            return True
        except Exception:
            return False

    def retrieve_comments(self, post_id: int) -> list:
        """
            Returns a list with all comments corresponding
            to the post described by the parameter post_id.
            If post_id is not valid, then it returns an empty
            list.
        """
        try:
            post = Posts.objects.get(post_id=post_id)
            return post.related_post.all()
            # ! should change related_name
            # in post_system_models.py on Comments
        except Exception:
            return []

    def add_comment(self, post_id, user: AppUsers, comment_text: str) -> bool:
        try:
            post = Posts.objects.get(post_id=post_id)
            new_comment = PostComments()
            new_comment.no_likes = 0
            new_comment.app_user = user
            new_comment.post = post
            new_comment.comment_text = comment_text
            new_comment.comment_date = datetime.now()
            new_comment.save()
        except Exception:
            return False
