from django.urls import path, include, re_path
from .views import UsersAPIViews, DialogAPIViews, UsersProfileAPIViews, UsersFriendsAPIViews, DialogsAPIViews, TakeIdByKeyAPIViews

urlpatterns = [
    path('api/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/users/', UsersAPIViews.as_view()),
    path('api/users/<int:pk>/', UsersAPIViews.as_view()),
    path('api/users/profile/<int:pk>/', UsersProfileAPIViews.as_view()),
    path('api/users/<int:pk>/friends/', UsersFriendsAPIViews.as_view()),
    path('api/friends/', UsersAPIViews.as_view()),
    path('api/dialog/<int:pk>/', DialogAPIViews.as_view()),
    path('api/dialogs/', DialogsAPIViews.as_view()),
    path('api/dialogs/<int:dialog_id>/', DialogsAPIViews.as_view()),
    path("api/idbykey/<str:key>/", TakeIdByKeyAPIViews.as_view())
]
