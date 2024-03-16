from fastapi import FastAPI, HTTPException
from starlette.responses import FileResponse
import os
import httpx

app = FastAPI()

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data') # Data directory

# Serve files from the data directory
@app.get("/data/{filename}")
async def serve_file(filename: str):
    file_path = os.path.join(DATA_DIR, filename)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

# Endpoint to fetch data from Server A (Node.js)
@app.get('/fetch_from_server_a/{filename}')
async def fetch_from_server_a(filename: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f'http://localhost:3000/data/{filename}')
            if response.status_code == 200:
                return response.text
            else:
                return HTTPException(status_code=response.status_code, detail=f"Server A responded with status: {response.status_code}")
        except httpx.HTTPError as exc:
            return HTTPException(status_code=500, detail=str(exc))

# Run the server using:
# uvicorn server_2_python:app --reload

# for python data fra samme server
# http://localhost:8000/data/server2_info.json
# http://localhost:8000/data/server2_info.txt
# http://localhost:8000/data/server2_info.xml
# http://localhost:8000/data/server2_info.yaml
# http://localhost:8000/data/server2_info.csv

# for at fetche samme data igennem node server 1
# http://localhost:8000/fetch_from_server_a/server1_info.json
# http://localhost:8000/fetch_from_server_a/server1_info.txt
# http://localhost:8000/fetch_from_server_a/server1_info.xml
# http://localhost:8000/fetch_from_server_a/server1_info.yaml
# http://localhost:8000/fetch_from_server_a/server1_info.csv
