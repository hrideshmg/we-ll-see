from django.db import models

from wellsee_backend.posts.models import Post
from wellsee_backend.users.models import User


class Interaction(models.Model):
    INTERACTION_CHOICES = [("BELIEVE", "Believe"), ("DOUBT", "Doubt")]
    post = models.ForeignKey(
        Post, related_name="interactions", on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, related_name="interactions", on_delete=models.CASCADE
    )
    interaction_type = models.CharField(choices=INTERACTION_CHOICES)
