# Quote Generator — Full Stack App (FastAPI + React + Databricks)

A full‑stack quote generation and favorites-saving application built with:

- **FastAPI** backend  
- **React (Vite)** frontend  
- **Databricks SQL** as database  
- **JWT authentication**  
- **Docker support** for deployment  

---

## Features

### **Backend**
- JWT-based authentication (register, login)
- Get random quotes via external API
- Save quotes per user
- Retrieve user favorites
- Delete saved quotes
- Databricks SQL connection

### **Frontend**
- Login / Logout
- Fetch random quotes
- Save quotes to backend
- Load saved favorites after login
- Remove saved favorites
- Clean UI with TailwindCSS

---

## Project Structure

```
Quote-Generator/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── random_quote.py
│   │   │   ├── quote.py
│   │   ├── utils/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── database.py
│   │   ├── config.py
│   │   ├── main.py
│   ├── Dockerfile
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│
└── README.md
```

---

## Installation & Setup

### Backend `.env`

```
DATABRICKS_SERVER_HOST=...
DATABRICKS_HTTP_PATH=...
DATABRICKS_TOKEN=...
JWT_SECRET=your_secret_key
```

### Start Backend
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Start Frontend
```
cd frontend
npm install
npm run dev
```

---

## Deployment with Docker

### Build Backend
```
docker build -t quote-backend ./backend
docker run -p 8000:8000 quote-backend
```

### Build Frontend
```
docker build -t quote-frontend ./frontend
docker run -p 4173:4173 quote-frontend
```

---

## API Endpoints

| Method | Endpoint         | Description |
|--------|------------------|-------------|
| POST   | /auth/register   | Register user |
| POST   | /auth/login      | Login user |
| GET    | /quotes/random   | Fetch random quote |
| POST   | /quotes/save     | Save favorite quote |
| GET    | /quotes/saved    | Get saved favorites |
| DELETE | /quotes/remove   | Delete quote |

---

## License
MIT License.
