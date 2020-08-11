# Generated by Django 3.1 on 2020-08-11 10:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_endpoints', '0002_usersession'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentlikes',
            name='app_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_comment_likes', to='api_endpoints.appusers'),
        ),
        migrations.AlterField(
            model_name='commentlikes',
            name='post_comment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_likes', to='api_endpoints.postcomments'),
        ),
        migrations.AlterField(
            model_name='postcomments',
            name='app_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_post_comments', to='api_endpoints.appusers'),
        ),
        migrations.AlterField(
            model_name='postcomments',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_post', to='api_endpoints.posts'),
        ),
        migrations.AlterField(
            model_name='postlikes',
            name='app_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes_post', to='api_endpoints.appusers'),
        ),
        migrations.AlterField(
            model_name='postlikes',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_likes', to='api_endpoints.posts'),
        ),
        migrations.AlterField(
            model_name='posts',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_posts', to='api_endpoints.appusers'),
        ),
        migrations.AlterField(
            model_name='usersession',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='current_sessions', to='api_endpoints.appusers'),
        ),
    ]
