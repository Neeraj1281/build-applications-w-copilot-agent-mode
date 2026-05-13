from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Create Users
        tony = User.objects.create_user(username='ironman', email='tony@marvel.com', password='pass', first_name='Tony', last_name='Stark', team=marvel)
        steve = User.objects.create_user(username='cap', email='steve@marvel.com', password='pass', first_name='Steve', last_name='Rogers', team=marvel)
        bruce = User.objects.create_user(username='hulk', email='bruce@marvel.com', password='pass', first_name='Bruce', last_name='Banner', team=marvel)
        clark = User.objects.create_user(username='superman', email='clark@dc.com', password='pass', first_name='Clark', last_name='Kent', team=dc)
        bruce_dc = User.objects.create_user(username='batman', email='bruce@dc.com', password='pass', first_name='Bruce', last_name='Wayne', team=dc)
        diana = User.objects.create_user(username='wonderwoman', email='diana@dc.com', password='pass', first_name='Diana', last_name='Prince', team=dc)

        # Create Workouts
        run = Workout.objects.create(name='Running', description='Run fast!')
        lift = Workout.objects.create(name='Weight Lifting', description='Lift heavy!')
        swim = Workout.objects.create(name='Swimming', description='Swim strong!')

        # Create Activities
        Activity.objects.create(user=tony, workout=run, duration=30, calories=300)
        Activity.objects.create(user=steve, workout=run, duration=45, calories=450)
        Activity.objects.create(user=bruce, workout=lift, duration=60, calories=600)
        Activity.objects.create(user=clark, workout=swim, duration=50, calories=500)
        Activity.objects.create(user=bruce_dc, workout=lift, duration=70, calories=700)
        Activity.objects.create(user=diana, workout=run, duration=40, calories=400)

        # Create Leaderboard
        Leaderboard.objects.create(user=tony, score=300)
        Leaderboard.objects.create(user=steve, score=450)
        Leaderboard.objects.create(user=bruce, score=600)
        Leaderboard.objects.create(user=clark, score=500)
        Leaderboard.objects.create(user=bruce_dc, score=700)
        Leaderboard.objects.create(user=diana, score=400)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
