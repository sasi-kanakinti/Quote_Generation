# -----------------------------
# 1) Base Image
# -----------------------------
FROM python:3.11-slim

# -----------------------------
# 2) Set work directory
# -----------------------------
WORKDIR /app

# -----------------------------
# 3) Install system dependencies
# -----------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------
# 4) Copy requirements first (for caching)
# -----------------------------
COPY requirements.txt .

# -----------------------------
# 5) Install Python dependencies
# -----------------------------
RUN pip install --no-cache-dir -r requirements.txt

# -----------------------------
# 6) Copy entire backend code
# -----------------------------
COPY . .

# -----------------------------
# 7) Expose FastAPI port
# -----------------------------
EXPOSE 8000

# -----------------------------
# 8) Start FastAPI with Uvicorn
# -----------------------------
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
