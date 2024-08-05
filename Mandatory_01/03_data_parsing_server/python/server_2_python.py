from fastapi import FastAPI, HTTPException
import os
import yaml
import csv
import xmltodict
import json

app = FastAPI()

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')  # Data directory

def parse_file_before_sending(file_path):
    """Parser filindhold før det sendes til klienten."""
    ext = os.path.splitext(file_path)[1]
    with open(file_path, 'r', encoding='utf-8') as file:
        if ext == '.json':
            return json.load(file)  # Parsing af JSON
        elif ext == '.csv':
            return list(csv.DictReader(file))  # Parsing af CSV
        elif ext == '.xml':
            return xmltodict.parse(file.read())  # Parsing af XML
        elif ext in ['.yaml', '.yml']:
            return yaml.safe_load(file)  # Parsing af YAML
        elif ext == '.txt':
            return file.read()  # Læsning af ren tekst
        else:
            raise ValueError('Uunderstøttet filformat')

# Serverer filer fra data-mappen
@app.get("/data/{filename}")
async def serve_file(filename: str):
    file_path = os.path.join(DATA_DIR, filename)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    try:
        data = parse_file_before_sending(file_path)
        return data  # Return parsed data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint for at hente data fra Server A
@app.get("/fetch-from-a/{filename}")
async def fetch_from_a(filename: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"http://localhost:3000/data/{filename}")
            data = response.json()
            return data  # Return data received from Server A
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fejl ved hentning fra Server A: {str(e)}")

# Kør serveren med:
# uvicorn server_b:app --reload
