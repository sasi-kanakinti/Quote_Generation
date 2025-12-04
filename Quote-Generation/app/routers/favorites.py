from fastapi import APIRouter, Depends, HTTPException
from app.database import get_connection
from app.utils.jwt_handler import get_current_user
import uuid

FAV_TABLE = "favorites"

router = APIRouter(prefix="/quotes", tags=["saved_quotes"])


# -----------------------------------------------------
# 1) SAVE QUOTE
# -----------------------------------------------------
@router.post("/save")
def save_quote(data: dict, user: dict = Depends(get_current_user)):
    content = data.get("content")
    author = data.get("author")

    if not content:
        raise HTTPException(400, "Quote content missing")

    fav_id = str(uuid.uuid4())

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"INSERT INTO {FAV_TABLE} (id, user_id, quote, author) VALUES (?, ?, ?, ?)",
            (fav_id, user["id"], content, author)
        )
    return {"message": "Quote saved", "id": fav_id}


# -----------------------------------------------------
# 2) GET ALL SAVED QUOTES FOR USER
# -----------------------------------------------------
@router.get("/saved")
def get_saved_quotes(user: dict = Depends(get_current_user)):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"SELECT id, quote, author FROM {FAV_TABLE} WHERE user_id = ?",
            (user["id"],)
        )
        rows = cursor.fetchall()

    return [
        {"id": r[0], "content": r[1], "author": r[2]}
        for r in rows
    ]


# -----------------------------------------------------
# 3) DELETE SAVED QUOTE
# -----------------------------------------------------
@router.delete("/remove/{quote_id}")
def remove_saved_quote(quote_id: str, user: dict = Depends(get_current_user)):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"DELETE FROM {FAV_TABLE} WHERE id = ? AND user_id = ?",
            (quote_id, user["id"])
        )
    return {"message": "Deleted"}
