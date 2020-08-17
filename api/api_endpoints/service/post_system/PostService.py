from ...models import AppUsers
from ...model.posts_system.posts_system_models import Posts
from datetime import datetime


class PostService:

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
