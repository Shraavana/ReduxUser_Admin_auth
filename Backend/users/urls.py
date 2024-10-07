from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('signup/',views.SignUp.as_view(), name='signup'),
    path('login/',views.LoginView.as_view(), name='login'),
    path('',views.UserPage.as_view(), name='userhomepage'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('profile/update',views.UserDetailsUpdate.as_view(), name='profiel_update'),

    path('admin_home/',views.AdminHomeContent.as_view(), name ='admin_home'),
    path('admin_home/<int:id>/',views.AdminUserRetrieveView.as_view(), name ='find_user'),
    path('admin_home/update/<int:id>/',views.AdminUserUpdateView.as_view(), name='update'),
    path('admin_home/delete/<int:id>/',views.AdminUserDeleteView.as_view(), name='delete'),
]