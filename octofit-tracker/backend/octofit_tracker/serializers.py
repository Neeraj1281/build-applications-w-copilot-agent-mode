
from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'team', 'team_name']

class TeamSerializer(serializers.ModelSerializer):
    member_count = serializers.IntegerField(source='user_set.count', read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'member_count']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description']

class ActivitySerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    workout_name = serializers.CharField(source='workout.name', read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_name', 'workout', 'workout_name', 'duration', 'calories']

class LeaderboardSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'user_name', 'score']
