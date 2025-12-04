from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, random_quote, favorites

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(random_quote.router)
app.include_router(favorites.router)

@app.get("/")
def root():
    return {"status": "backend running"}
