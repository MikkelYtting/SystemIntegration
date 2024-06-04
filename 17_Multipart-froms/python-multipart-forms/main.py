from fastapi import FastAPI, Form, File, UploadFile
import aiofiles
from typing import Optional

app = FastAPI()

# endpoint til form 
@app.post("/form")
def basic_form(username: str = Form(...), password: str = Form(default=..., min_length=8)):
    print(username, password)
    return { "username": username }

# endpoint til fill upload
@app.post("/fileform")
async def file_form(file: UploadFile = File(...), description: Optional[str] = Form(None)):
    print(description)

    safe_filename = file.filename.replace("/", "_").replace("\\", "_")

    # aiofiles = async
    async with aiofiles.open (safe_filename, 'wb') as f:
              
        while content := await file.read(1024): # read in 1024 chunks
            await f.write(content)

# for python:
# pip install fastapi aiofiles "uvicorn[standard]" python-multipart

# to run:
# uvicorn main:app
