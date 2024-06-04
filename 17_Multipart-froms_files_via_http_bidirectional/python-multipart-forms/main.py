from fastapi import FastAPI, Form, File, UploadFile
from fastapi.responses import FileResponse
import aiofiles
from typing import Optional
import os

app = FastAPI()

# Første to metoder er client til server

# Endpoint til form 
@app.post("/form")
def basic_form(username: str = Form(...), password: str = Form(default=..., min_length=8)):
    print(username, password)
    return {"username": username}

# Endpoint til fil upload
@app.post("/fileform")
async def file_form(file: UploadFile = File(...), description: Optional[str] = Form(None)):
    print(description)
    
    safe_filename = file.filename.replace("/", "_").replace("\\", "_")

    # aiofiles = async
    async with aiofiles.open(safe_filename, 'wb') as f:
        while content := await file.read(1024):  # read in 1024 chunks
            await f.write(content)
    
    return {"filename": safe_filename}

# Denne metode er server til klient
@app.get("/server_to_client_download/{filename}")
def server_to_client_download(filename: str):
    """
    Sender en fil fra serveren til klienten.
    
    Args:
        filename (str): Navnet på filen, der skal downloades.

    Returns:
        FileResponse: Filen, der skal downloades.
    """
    safe_filename = filename.replace("/", "_").replace("\\", "_")
    file_path = os.path.join(os.getcwd(), safe_filename)

    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename, media_type='application/octet-stream')
    else:
        return {"error": "File not found"}

# For at installere nødvendige pakker:
# pip install fastapi aiofiles "uvicorn[standard]" python-multipart

# For at køre serveren:
# uvicorn main:app --reload
