from django.db import models

class Users(models.Model):
    name = models.CharField(max_length=30)
    aboutme = models.CharField(max_length=300, blank=True)
    telephon = models.CharField(max_length=15)
    city = models.CharField(max_length=30, blank=True)
    age = models.IntegerField(blank=True)
    friends = models.ManyToManyField("self", symmetrical=False, blank=True)
    key = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f"{self.name}"

class Dialog(models.Model):
    participants = models.ManyToManyField(Users, related_name='dialogs')

    def __str__(self):
        participant_names = ', '.join([user.first_name for user in self.participants.all()])
        return f"Dialog between: {participant_names}"

class Messages(models.Model):
    text = models.CharField(max_length=300, default='')
    sender = models.ForeignKey(Users, on_delete=models.PROTECT, related_name='sent_messages')
    time = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE, related_name='messages')

    def __str__(self):
        return f"From {self.sender.first_name} to {self.recipient.first_name}: {self.text}"
