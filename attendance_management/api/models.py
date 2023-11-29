import uuid
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, 
    AbstractBaseUser,
    PermissionsMixin
    )


class UserAccountManager(BaseUserManager):
    def create_user(self, name, email, user_type , password, EID=None):
        print(EID)
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

    def create_superuser(self, email, password , **extra_fields):
        extra_fields.setdefault('user_type', 'admin')
        user = self.create_user(
            email,
            password=password,
            **extra_fields,
        )
        user.is_admin = True
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
    EID = models.CharField(max_length=255, blank=True, null=True , unique=True)

    user_type = models.CharField(max_length=10, choices=user_type_choices)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserAccountManager()

    
    if user_type == 'faculty': 
        USERNAME_FIELD = "email"
        REQUIRED_FIELDS = ["name", "user_type", 'password']
    else:
        USERNAME_FIELD = "EID"
        REQUIRED_FIELDS = ["email", "name", "user_type", 'password']

    def __str__(self):
        return self

