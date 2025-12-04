from databricks import sql
from app.config import (
    DATABRICKS_SERVER_HOST,
    DATABRICKS_HTTP_PATH,
    DATABRICKS_TOKEN
)

def get_connection():
    return sql.connect(
        server_hostname=DATABRICKS_SERVER_HOST,
        http_path=DATABRICKS_HTTP_PATH,
        access_token=DATABRICKS_TOKEN,
        autocommit=True 
    )
