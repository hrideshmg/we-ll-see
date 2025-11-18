from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "content",
            "deadline",
            "image",
            "status",
            "proof_media",
            "believes",
            "doubts",
        ]
        extra_kwargs = {
            "user": {"read_only": True},
            "believes": {"read_only": True},
            "doubts": {"read_only": True},
        }
