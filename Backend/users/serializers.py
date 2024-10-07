from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, UserProfile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['firstname'] = user.first_name
        # ...

        return token
    


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=30, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=30, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email','first_name','last_name','password','password2']

    def validate(self,attrs):
        password = attrs.get('password','')
        password2 = attrs.get('password2','')
        if password != password2:
            raise serializers.ValidationError('password dosn\'t match')
        return attrs
    
    def create(self,validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            first_name = validated_data.get('first_name'),
            last_name = validated_data.get('last_name'),
            password = validated_data.get('password')
        )
        return user

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(max_length=50, write_only=True)
    access_token = serializers.CharField(max_length=500, read_only=True)
    refresh_token = serializers.CharField(max_length=500, read_only=True)
    isAdmin = serializers.BooleanField(read_only=True)
    first_name = serializers.CharField(max_length=30, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'access_token', 'refresh_token', 'isAdmin', 'first_name']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request=self.context.get('request')
        user = authenticate(request, email=email, password= password)

        if user is None:
            raise AuthenticationFailed('Invalid credentials. Please try again.')
        

        token = user.tokens() 

        return {
            'email': user.email,
            'isAdmin': user.is_superuser,
            'first_name': user.first_name,
            'access_token': str(token.get('access')),
            'refresh_token': str(token.get('refresh')),
        }
    
class UserPageSerlizer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

####### admin ######
class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = ['profile_pic']
    

class AdminHomeSerlizer(serializers.ModelSerializer):
    Profile = UserProfileSerializer(required = True)

    class Meta:
        model = User
        fields =['id','first_name','last_name','email','password','Profile','is_superuser','date_joined']
        extra_kwargs ={
            'password':{'write_only':True},
            'first_name':{'error_messages':{'required':'Please provide the first name.'}},
            'last_name':{'error_messages':{'required':'Please provide the last_name.'}},
            'email':{'error_messages':{'required':'Please provide the email.'}},
        }
    
    def create(self, validated_data):
        pro_pic = validated_data.pop('Profile')
        passsword = validated_data.pop('password',None)
        user = self.Meta.model(**validated_data)
        
        if passsword is not None:
            user.set_password(passsword)
            user.save()
        
        UserProfile.objects.create(user = user, **pro_pic)
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'is_active']

    def update(self, instance, validated_data):
        # Update user fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        
        instance.save()
        return instance