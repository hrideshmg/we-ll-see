# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken

# from .serializers import RegisterSerializer,LoginSerializer, UserSerializer

# class RegisterView(APIView):
#     def post(self,request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"message":"user created successfully"},status=201)
#         return Response(serializer.errors,status=400)
    
# class LoginView(APIView):
#     def post(self,request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user= serializer.validated_data["user"]
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 "refresh": str(refresh),
#                 "access": str(refresh.access_token),
#                 "user": UserSerializer(user).data
#             })
#         return Response(serializer.errors, status=400)
    
# class ProfileView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self,request):
#         return Response(UserSerializer(request.user).data)

from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "name"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["username", "email", "password", "name"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            name=validated_data.get("name", "")
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])

        if user is None:
            raise serializers.ValidationError("Invalid username or password")

        data["user"] = user
        return data
