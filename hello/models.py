from django.db import models

# Create models here.
class Greeting(models.Model):
    when = models.DateTimeField("date created", auto_now_add=True)
