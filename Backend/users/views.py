from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.parsers import MultiPartParser, FormParser

from . serializers import UserRegisterSerializer, LoginSerializer, UserPageSerlizer, UserProfileSerializer, AdminHomeSerlizer, UserUpdateSerializer
from .models import User,UserProfile


class MyRefreshTokenObtainPairSerializer(TokenRefreshSerializer):
    def __init__(self, *args, **kwargs):
        request = kwargs.pop('request', None)
        print(request)
        super().__init__(*args, **kwargs)

class MyRefreshTokenObtainPairView(TokenRefreshView):
    serializer_class = MyRefreshTokenObtainPairSerializer


class SignUp(GenericAPIView):
    def post(self,request):
        user_data = request.data
        serializer = UserRegisterSerializer(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            return Response({
                'data':user,
                'message':f"Thank you for signing in our site"
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self,request):
        serializer = LoginSerializer(data=request.data,context={'request':request})
        if  serializer.is_valid(raise_exception=True):
           return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserPage(GenericAPIView):

    permission_classes = [IsAuthenticated]
    def get(sef,request):
        try:
            user = User.objects.get(id=request.user.id)
           
            data = UserPageSerlizer(user).data
            try:
                profile = user.Profile
                profile_pic_url = request.build_absolute_uri('/')[:-1] + profile.profile_pic.url  
                data['profile_pic'] = profile_pic_url
            except UserProfile.DoesNotExist:
                print('not found')
                profile_pic = None
                data['profile_pic'] = None  
            except Exception as e:
                
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            content = data
            return Response(content, status=status.HTTP_200_OK)
        except NotFound:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDetailsUpdate(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get_or_create(user=request.user)[0]

        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
           
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
     permission_classes = [IsAuthenticated]
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)

class AdminHomeContent(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = AdminHomeSerlizer
    pagination_class = PageNumberPagination
    filter_backends = [SearchFilter]
    search_fileds = ['first_name', 'last_name', 'email']

class AdminUserRetrieveView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = AdminHomeSerlizer
    lookup_field = 'id'

class AdminUserUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'id'

class AdminUserDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response({'message':'Deleted successfully'},status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)