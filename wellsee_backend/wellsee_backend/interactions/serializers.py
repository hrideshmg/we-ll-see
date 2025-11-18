from rest_framework import serializers

from .models import Interaction


class CreateInteractionSerializer(serializers.Serializer):
    post_id = serializers.IntegerField()
    interaction_type = serializers.ChoiceField(choices=Interaction.INTERACTION_CHOICES)
