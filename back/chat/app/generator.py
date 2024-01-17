from django.db import connection
from . import models

def generate():

    models.Messages.objects.all().delete()
    models.Users.objects.all().delete()
    models.Friends.objects.all().delete()

    user1 = models.Users.objects.create(first_name='Роман', second_name='Гавриленко', age=20)
    user2 = models.Users.objects.create(first_name='Илья', second_name='Андрюков', age=19)

