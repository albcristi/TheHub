from rest_framework import serializers
from ...model.posts_system.posts_system_models import Posts, PostLikes, PostComments, CommentLikes


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['post_id',
                  'post_tile',
                  'post_text',
                  'post_date',
                  'user',
                  'no_likes',
                  'related_post'
                  ]


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLikes
        fields = ['id',
                  'post',
                  'app_user'
                  ]


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComments
        fields = ['id',
                  'app_user',
                  'comment_text',
                  'no_likes'
                  ]


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLikes
        fields = ['id',
                  'app_user'
                  ]
