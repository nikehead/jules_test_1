from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import os

app = FastAPI()

# Data Models
class LoginRequest(BaseModel):
    username: str
    password: str

class SEMRequest(BaseModel):
    sample_name: str
    magnification: str
    voltage: str
    description: str
    requester: str

# In-memory storage
sem_requests: List[SEMRequest] = []

# Get the directory of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Mount static files using absolute path
static_dir = os.path.join(BASE_DIR, "static")
if not os.path.exists(static_dir):
    print(f"WARNING: Static directory not found at {static_dir}")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Routes
@app.get("/")
async def read_root():
    return FileResponse(os.path.join(BASE_DIR, "index.html"))

@app.get("/dashboard")
async def read_dashboard():
    return FileResponse(os.path.join(BASE_DIR, "requests.html"))

@app.post("/login")
async def login(data: LoginRequest):
    # Mock login logic
    return {"message": f"{data.username}님 환영합니다!"}

@app.get("/api/requests", response_model=List[SEMRequest])
async def get_requests():
    return sem_requests

@app.post("/api/requests")
async def create_request(request: SEMRequest):
    sem_requests.append(request)
    return {"message": "의뢰가 성공적으로 등록되었습니다."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
