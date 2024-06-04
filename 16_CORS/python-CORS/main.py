from fastapi import FastAPI
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/timestamp")
def timestamp():
    return {"time": datetime.now()}


# pip install fastapi uvicorn
# npm i cors
# uvicorn main:app