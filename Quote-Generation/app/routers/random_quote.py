import requests
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/quotes", tags=["quotes"])

@router.get("/random")
def get_random_quote():
    try:
        res = requests.get("https://zenquotes.io/api/random", timeout=10)
        if res.status_code != 200:
            raise HTTPException(500, "Failed to fetch quote")

        data = res.json()[0]  

        return {
            "id": data["a"] + "_id",       
            "content": data["q"],       
            "author": data["a"],           
            "tags": []                     
        }

    except Exception as e:
        raise HTTPException(500, f"Error fetching quote: {str(e)}")
