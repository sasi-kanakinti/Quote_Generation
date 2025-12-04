import os
from dotenv import load_dotenv

load_dotenv()

DATABRICKS_SERVER_HOST = os.getenv("DATABRICKS_SERVER_HOST")
DATABRICKS_HTTP_PATH = os.getenv("DATABRICKS_HTTP_PATH")
DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"