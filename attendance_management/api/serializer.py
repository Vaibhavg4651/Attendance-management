from rest_framework import serializers
from .models import UserAccount as user
from .models import Branch , Proctor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ( 'name' , 'email' , 'user_type' , 'password' , 'EID') #add all the fields of table
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8}
        }

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('BranchID', 'BranchName', 'ClassName')

class ProctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proctor
        fields = '__all__'

