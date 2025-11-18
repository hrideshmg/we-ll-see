from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from wellsee_backend.posts.models import Post

from .models import Interaction
from .serializers import CreateInteractionSerializer


class InteractionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateInteractionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        post_id = serializer.validated_data["post_id"]
        interaction_type = serializer.validated_data["interaction_type"]
        user = request.user

        post = get_object_or_404(Post, id=post_id)

        with transaction.atomic():
            try:
                interaction = Interaction.objects.select_for_update().get(
                    user=user, post=post
                )
                # Interaction exists
                if interaction.interaction_type == interaction_type:
                    # same type, so delete
                    interaction.delete()
                    if interaction_type == "BELIEVE":
                        post.believes -= 1
                    else:
                        post.doubts -= 1
                    post.save(update_fields=["believes", "doubts"])
                    return Response(
                        {"status": "interaction removed"}, status=status.HTTP_200_OK
                    )
                else:
                    # different type, so switch
                    old_type = interaction.interaction_type
                    interaction.interaction_type = interaction_type
                    interaction.save(update_fields=["interaction_type"])
                    if old_type == "BELIEVE":
                        post.believes -= 1
                        post.doubts += 1
                    else:
                        post.doubts -= 1
                        post.believes += 1
                    post.save(update_fields=["believes", "doubts"])
                    return Response(
                        {"status": "interaction switched"}, status=status.HTTP_200_OK
                    )
            except Interaction.DoesNotExist:
                # Interaction does not exist, create it
                Interaction.objects.create(
                    user=user, post=post, interaction_type=interaction_type
                )
                if interaction_type == "BELIEVE":
                    post.believes += 1
                else:
                    post.doubts += 1
                post.save(update_fields=["believes", "doubts"])
                return Response(
                    {"status": "interaction created"}, status=status.HTTP_201_CREATED
                )
