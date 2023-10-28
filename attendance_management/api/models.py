from django.db import models

# Create your models here.
class user(models.Model):
    id = models.IntegerField(null=False , default=False, primary_key=True)
    code = models.IntegerField(null=False , max_length=10 )