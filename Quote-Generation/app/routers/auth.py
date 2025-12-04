from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.hash import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from app.models.user import USER_TABLE
import uuid

router = APIRouter(prefix="/auth")

@router.post("/register")
def register(data: UserCreate):
    with get_connection() as conn:
        cursor = conn.cursor()

        # Check existing user
        cursor.execute(
            f"SELECT id FROM {USER_TABLE} WHERE email = ?",
            (data.email,)
        )
        if cursor.fetchone():
            raise HTTPException(400, "User already exists")

        hashed_password = hash_password(data.password)
        user_id = str(uuid.uuid4())

        # Insert user (auto-committed by Databricks)
        cursor.execute(
            f"INSERT INTO {USER_TABLE} (id, username, email, password) VALUES (?, ?, ?, ?)",
            (user_id, data.username, data.email, hashed_password)
        )

    return {"message": "Registered successfully"}



@router.post("/login")
def login(data: UserLogin):
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute(
            f"SELECT id, email, password FROM {USER_TABLE} WHERE email = ?",
            (data.email,)
        )
        row = cursor.fetchone()

        if not row or not verify_password(data.password, row[2]):
            raise HTTPException(401, "Invalid credentials")

        token = create_access_token({"id": row[0], "email": row[1]})

    return {"access_token": token}
