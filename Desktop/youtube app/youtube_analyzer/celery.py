"""
Celery configuration for handling asynchronous tasks.
"""
import os
from celery import Celery

# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youtube_analyzer.settings')

# Create the Celery app
app = Celery('youtube_analyzer')

# Load configuration from Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
app.autodiscover_tasks()
