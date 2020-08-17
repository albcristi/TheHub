from ...models import AppUsers
from ...model.posts_system.posts_system_models import Posts
from datetime import datetime
from ..UserService import UserService


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

    def return_post_from_friends(self, user_name: str):
        friend_list = self.__user_service.get_user_friends(user_name)
        if friend_list.count() == 0:
            return []
        posts = []
        for friend in friend_list:
            friends_post = friend.user_posts.all()
            for post in friends_post:
                posts.append(post)
        return posts
