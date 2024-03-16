from fastapi import FastAPI
import xml.etree.ElementTree as ET
import yaml
import json
import csv
import io

app = FastAPI()

@app.get("/text")
async def get_text():
    with open("data.txt", "r") as file:
        content = file.read()
    return {"Text": content}

@app.get("/xml")
async def get_xml():
    with open("data.xml", "r") as file:
        content = ET.parse(file).getroot()
    # Convert XML ElementTree to a dictionary
    xml_dict = {content.tag: content.text for content in list(content)}
    return {"XML": xml_dict}

@app.get("/yaml")
async def get_yaml():
    with open("data.yaml", "r") as file:
        content = yaml.safe_load(file)
    return {"YAML": content}

@app.get("/json")
async def get_json():
    with open("data.json", "r") as file:
        content = json.load(file)
    return {"JSON": content}

@app.get("/csv")
async def get_csv():
    with open("data.csv", mode="r") as file:
        reader = csv.DictReader(file)
        content = [row for row in reader]
    return {"CSV": content}

# Start server med uvicorn Server:app --reload

# For at tjekke se endpoints:
# http://127.0.0.1:8000/text for text content.
# http://127.0.0.1:8000/xml for XML content.
# http://127.0.0.1:8000/yaml for YAML content.
# http://127.0.0.1:8000/json for JSON content.
# http://127.0.0.1:8000/csv for CSV content.