# Generated by Django 3.1 on 2020-09-01 12:47

import api_endpoints.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_endpoints', '0005_appusers_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appusers',
            name='profile_picture',
            field=models.ImageField(null=True, upload_to=api_endpoints.models.user_profile_pic_location),
        ),
    ]