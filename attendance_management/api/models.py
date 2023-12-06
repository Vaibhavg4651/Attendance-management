import uuid
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, 
    AbstractBaseUser,
    PermissionsMixin
    )


class UserAccountManager(BaseUserManager):
    def create_user(self, name, email, user_type , password, EID):
        if not email:
            raise ValueError("Users must have an email address")

        if user_type == 'proctor' and not EID:
            raise ValueError("Proctor must have a EID")
    
        user = self.model(
            id=uuid.uuid4(),
            email=self.normalize_email(email),
            name=name,
            user_type=user_type,
            EID=EID,
        )

        user.set_password(password)
        
        user.save(using=self._db)
        return user
        



class UserAccount(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)
    email = models.EmailField(
        max_length=255,
    )
    name = models.CharField(max_length=255)
    user_type_choices = [
        ('faculty', 'Faculty'),
        ('proctor', 'Proctor'),
    ]

    password = models.CharField(max_length=255)
    EID = models.CharField(max_length=255, unique=True)

    user_type = models.CharField(max_length=10, choices=user_type_choices)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserAccountManager()
    USERNAME_FIELD ="EID"
    REQUIRED_FIELDS = ["email", "name", "user_type", 'password']

    def __str__(self):
        return self

