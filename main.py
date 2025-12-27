from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

app = FastAPI()

class LoginRequest(BaseModel):
    username: str
    password: str

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_root():
    return FileResponse("index.html")

@app.post("/login")
async def login(data: LoginRequest):
    # Here you would typically verify the username and password against a database
    # For now, we will just return a success message with the username
    return {"message": f"{data.username}님 환영합니다!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
