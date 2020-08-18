from ...models import AppUsers
from ...model.posts_system.posts_system_models import Posts
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
        if friend_list.count() == 0:
            return []
        usr = friend_list[0].friendship_owner
        friend_list = [friend.friend_with for friend in set(friend_list)]
        friend_list.append(usr)
        try:
            print(str(friend_list))
            posts = Posts.objects.\
                filter(user__in=friend_list).\
                order_by('-post_date', '-post_id')
            print('ss')
            print(str(posts))
            paginator = Paginator(posts, no_per_page)
            result = paginator.page(page_no)\
                .object_list
            return result
        except Exception as e:
            print(e)
            return []
