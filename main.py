from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

app = FastAPI()

class LoginRequest(BaseModel):
    username: str
    password: str

# Get the directory of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Mount static files using absolute path
static_dir = os.path.join(BASE_DIR, "static")
if not os.path.exists(static_dir):
    print(f"WARNING: Static directory not found at {static_dir}")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def read_root():
    # Serve index.html using absolute path
    return FileResponse(os.path.join(BASE_DIR, "index.html"))

@app.post("/login")
async def login(data: LoginRequest):
    # Here you would typically verify the username and password against a database
    # For now, we will just return a success message with the username
    return {"message": f"{data.username}님 환영합니다!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
