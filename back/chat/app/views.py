from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializers import UsersSerializer, MessagesSerializer, DialogSerializer
from .models import Messages, Users, Dialog

class UsersAPIViews(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        all_users = Users.objects.all()
        values = all_users.values()
        lst = list(values)
        return Response({'get': lst})


    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data}, status=status.HTTP_201_CREATED)

    def put(self, request):
        id = request.data.get("id", None)

        if not id:
            return Response({"error": "Method is not allowed"})
        try:
            instance = Users.objects.get(id=id)
        except:
            return Response({"error": "No such id in databases"})

        users_serializer = UsersSerializer(instance=instance, data=request.data)
        users_serializer.is_valid()
        users_serializer.save()

        return Response({"put_users": users_serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method Delete is not allowed'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instance = Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return Response({'error': 'Object does not exist'}, status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UsersProfileAPIViews(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        friend = get_object_or_404(Users, pk=pk)
        serializer = UsersSerializer(friend)
        return Response(serializer.data)

class UsersFriendsAPIViews(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            user = Users.objects.get(pk=pk)
            friends = user.friends.all()
            serializer = UsersSerializer(friends, many=True)
            return Response(serializer.data)
        except Users.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            user = Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        friends_data = request.data.get('friends', [])
        user.friends.set(friends_data)
        user.save()

        serializer = UsersSerializer(user)
        return Response(serializer.data)

class DialogsAPIViews(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        all_dialogs = Dialog.objects.all()
        serializer = DialogSerializer(all_dialogs, many=True)
        return Response({'get': serializer.data})

    def post(self, request):
        serializer = DialogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data}, status=status.HTTP_201_CREATED)


    def delete(self, request, dialog_id):
        try:
            dialog = Dialog.objects.get(id=dialog_id)
        except Dialog.DoesNotExist:
            return Response(
                {'error': f'Dialog with id {dialog_id} does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        dialog.delete()
        return Response({'message': f'Dialog with id {dialog_id} deleted successfully'},
                        status=status.HTTP_204_NO_CONTENT)


class DialogAPIViews(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            dialog = Dialog.objects.get(pk=pk)
        except Dialog.DoesNotExist:
            return Response({'error': 'Dialog not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = Messages.objects.filter(dialog=dialog)
        serializer = MessagesSerializer(messages, many=True)

        return Response({'dialog': serializer.data})

    def put(self, request, pk):
        try:
            dialog = Dialog.objects.get(pk=pk)
        except Dialog.DoesNotExist:
            return Response({'error': 'Dialog not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = DialogSerializer(instance=dialog, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'put': serializer.data})

    def delete(self, request, pk):
        try:
            dialog = Dialog.objects.get(pk=pk)
        except Dialog.DoesNotExist:
            return Response({'error': 'Dialog not found'}, status=status.HTTP_404_NOT_FOUND)

        dialog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, pk):
        data = request.data.copy()
        data['dialog'] = pk

        message_serializer = MessagesSerializer(data=data)
        message_serializer.is_valid(raise_exception=True)
        message_serializer.save()

        return Response({'post': message_serializer.data}, status=status.HTTP_201_CREATED)

class TakeIdByKeyAPIViews(APIView):
    def get(self, request, key):
        currUser = Users.objects.filter(key=key)
        print(currUser)
        serializer = UsersSerializer(currUser, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
