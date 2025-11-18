from django.urls import path

from .views import InteractionView

app_name = "interactions"

urlpatterns = [
    path("", InteractionView.as_view(), name="interact"),
]
