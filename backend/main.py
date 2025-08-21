from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import os
import json
import asyncio
from typing import List, Optional
import numpy as np
import cv2
from PIL import Image
import io
import base64
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext

# Initialize FastAPI app
app = FastAPI(
    title="Voxel AI API",
    description="Advanced AI application with voxel rendering and multimedia processing",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"

# Data models
class User(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class VoxelData(BaseModel):
    voxels: List[List[List[int]]]
    size: tuple
    colors: List[str]

class AIRequest(BaseModel):
    prompt: str
    type: str  # "image", "video", "audio", "3d", "text"
    parameters: Optional[dict] = {}

# In-memory storage (replace with database in production)
users_db = {}
sessions_db = {}

# Helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to Voxel AI", "version": "1.0.0"}

@app.post("/auth/register")
async def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = pwd_context.hash(user.password)
    users_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    
    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer", "user": {"username": user.username, "email": user.email}}

@app.post("/auth/login")
async def login(user_login: UserLogin):
    if user_login.username not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    stored_user = users_db[user_login.username]
    if not pwd_context.verify(user_login.password, stored_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": user_login.username})
    return {"access_token": token, "token_type": "bearer", "user": {"username": stored_user["username"], "email": stored_user["email"]}}

@app.get("/auth/me")
async def get_current_user(current_user: str = Depends(verify_token)):
    if current_user not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = users_db[current_user]
    return {"username": user_data["username"], "email": user_data["email"]}

@app.post("/ai/generate")
async def generate_ai_content(request: AIRequest, current_user: str = Depends(verify_token)):
    """Generate AI content based on prompt and type"""
    try:
        if request.type == "image":
            # Simulate image generation
            return {
                "type": "image",
                "result": {
                    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                    "prompt": request.prompt,
                    "generated_at": datetime.utcnow().isoformat()
                }
            }
        elif request.type == "3d":
            # Simulate 3D model generation
            return {
                "type": "3d",
                "result": {
                    "voxels": [[[1, 0, 1], [0, 1, 0], [1, 0, 1]] for _ in range(8)],
                    "size": [8, 8, 8],
                    "colors": ["#ff0000", "#00ff00", "#0000ff"],
                    "prompt": request.prompt,
                    "generated_at": datetime.utcnow().isoformat()
                }
            }
        elif request.type == "text":
            # Simulate text generation
            return {
                "type": "text",
                "result": {
                    "text": f"Generated response for: {request.prompt}. This is a sophisticated AI-generated response that demonstrates the capabilities of the Voxel AI system.",
                    "prompt": request.prompt,
                    "generated_at": datetime.utcnow().isoformat()
                }
            }
        else:
            return {
                "type": request.type,
                "result": {
                    "message": f"Processing {request.type} content for: {request.prompt}",
                    "status": "processing",
                    "generated_at": datetime.utcnow().isoformat()
                }
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

@app.post("/voxel/create")
async def create_voxel_model(voxel_data: VoxelData, current_user: str = Depends(verify_token)):
    """Create a new voxel model"""
    try:
        model_id = f"voxel_{datetime.utcnow().timestamp()}"
        return {
            "model_id": model_id,
            "size": voxel_data.size,
            "voxel_count": sum(sum(sum(layer) for layer in row) for row in voxel_data.voxels),
            "colors": voxel_data.colors,
            "created_at": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Voxel creation failed: {str(e)}")

@app.post("/upload/file")
async def upload_file(file: UploadFile = File(...), current_user: str = Depends(verify_token)):
    """Upload and process files (images, videos, audio, PDF, PPT)"""
    try:
        contents = await file.read()
        file_info = {
            "filename": file.filename,
            "content_type": file.content_type,
            "size": len(contents),
            "uploaded_at": datetime.utcnow().isoformat()
        }
        
        # Process based on file type
        if file.content_type.startswith("image/"):
            # Process image
            image = Image.open(io.BytesIO(contents))
            file_info["dimensions"] = image.size
            file_info["mode"] = image.mode
            
        elif file.content_type.startswith("video/"):
            # Process video
            file_info["type"] = "video"
            
        elif file.content_type.startswith("audio/"):
            # Process audio
            file_info["type"] = "audio"
            
        elif file.content_type == "application/pdf":
            # Process PDF
            file_info["type"] = "pdf"
            
        elif file.content_type.startswith("application/vnd.ms-powerpoint") or file.content_type.startswith("application/vnd.openxmlformats-officedocument.presentationml"):
            # Process PowerPoint
            file_info["type"] = "presentation"
        
        return {"status": "success", "file_info": file_info}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")

@app.websocket("/ws/voice")
async def websocket_voice_assistant(websocket: WebSocket):
    """WebSocket endpoint for voice assistant"""
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message["type"] == "voice_input":
                # Process voice input
                response = {
                    "type": "voice_response",
                    "text": f"I heard: {message.get('text', 'audio data')}",
                    "timestamp": datetime.utcnow().isoformat()
                }
                await websocket.send_text(json.dumps(response))
                
            elif message["type"] == "text_input":
                # Process text input
                response = {
                    "type": "text_response",
                    "text": f"AI Response: {message.get('text', '')}. How can I help you further?",
                    "timestamp": datetime.utcnow().isoformat()
                }
                await websocket.send_text(json.dumps(response))
                
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)