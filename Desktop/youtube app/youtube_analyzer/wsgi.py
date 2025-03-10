"""
WSGI config for youtube_analyzer project.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youtube_analyzer.settings')

application = get_wsgi_application()
