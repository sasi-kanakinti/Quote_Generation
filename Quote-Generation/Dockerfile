FROM python:3.11-slim

WORKDIR /app

# system packages needed for some python libs
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# copy and install python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy application code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
