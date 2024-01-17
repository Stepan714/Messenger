from rest_framework import serializers
from .models import Users, Messages, Dialog


class UsersSerializer(serializers.ModelSerializer):
    friends = serializers.PrimaryKeyRelatedField(many=True, queryset=Users.objects.all())
    key = serializers.CharField(max_length=50)

    class Meta:
        model = Users
        fields = '__all__'

    def create(self, validated_data):
        friends_data = validated_data.pop('friends', [])
        user = Users.objects.create(**validated_data)

        for friend_id in friends_data:
            friend = Users.objects.get(pk=friend_id.pk)
            user.friends.add(friend)

        return user

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)
        instance.aboutme = validated_data.get('aboutme', instance.aboutme)
        instance.telephon = validated_data.get('telephon', instance.telephon)
        instance.city = validated_data.get('city', instance.city)
        instance.age = validated_data.get('age', instance.age)
        instance.key = validated_data.get('key', instance.key)

        friends_data = validated_data.pop('friends', [])
        instance.friends.clear()

        for friend_id in friends_data:
            friend = Users.objects.get(pk=friend_id.pk)
            instance.friends.add(friend)

        instance.save()
        return instance

class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'

    id = serializers.IntegerField(read_only=True)
    sender = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())
    dialog = serializers.PrimaryKeyRelatedField(queryset=Dialog.objects.all())

    def create(self, validated_data):
        return Messages.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.text = validated_data.get("text", instance.text)
        instance.is_read = validated_data.get("is_read", instance.is_read)
        instance.save()
        return instance

class DialogSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all(), many=True)

    class Meta:
        model = Dialog
        fields = '__all__'

    def create(self, validated_data):
        participants_data = validated_data.pop('participants')
        dialog = Dialog.objects.create(**validated_data)
        dialog.participants.set(participants_data)
        return dialog

    def update(self, instance, validated_data):
        instance.participants.clear()

        participants = validated_data.pop('participants', [])
        for participant_id in participants:
            user = Users.objects.get(pk=participant_id)
            instance.participants.add(user)

        instance.save()
        return instance
