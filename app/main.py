import sys
import os

# Set up backend path so that uvicorn can load the backend app files when started from root folder
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from backend.app.main import *
