from django.db import models
from django.utils import timezone

class Message(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(max_length=255, blank=False, null=False)
    image = models.ImageField(upload_to='images/', blank=False, null=False)
    create_time = models.DateTimeField(default=timezone.now)
