import uuid
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, 
    AbstractBaseUser,
    PermissionsMixin
    )

# user acount model
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
        

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('user_type', 'admin')
        user = self.model(
            email=self.normalize_email(email),
            password=password,
            **extra_fields,
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
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
        ('admin', 'Admin')
    ]

    password = models.CharField(max_length=255)
    EID = models.CharField(max_length=255)

    user_type = models.CharField(max_length=10, choices=user_type_choices)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()
    USERNAME_FIELD ="id"
    REQUIRED_FIELDS = ["email", "name", "user_type", 'password', 'EID']

    def __str__(self):
        return self


#Branch model
class Branch(models.Model):
    BranchID = models.AutoField(primary_key=True)
    BranchName = models.CharField(max_length=255)
    ClassName = models.CharField(max_length=255)

class Proctor(models.Model):
    ProctorID = models.AutoField(primary_key=True)
    id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    BranchID = models.ForeignKey(Branch, on_delete=models.CASCADE)
    SemesterNumber = models.IntegerField()
    
    class Meta:
        unique_together = ('id', 'BranchID')