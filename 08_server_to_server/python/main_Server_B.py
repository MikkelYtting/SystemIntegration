from fastapi import FastAPI
import requests

app = FastAPI()
# Endpoint, der returnerer en simpel liste
# // for at see resultet se: http://127.0.0.1:8000/requestexpress
@app.get("/fastapiData")
def _():
    return {"message": [1, 2, 3, 4, 8] }

# Endpoint, der henter data fra Express-serveren
@app.get("/requestexpress")
def get_express_data():
    # Sender en http get-request til Express-serveren for at hente data fra /expressData,
    # parser JSON-svaret og returnerer det som JSON-data.
    response = requests.get("http://127.0.0.1:8080/expressData").json()
    return { "data": response }









# kør først poetry shell
# derefter uvicorn main_Server_B:app
# For at se http://127.0.0.1:8000/requestexpress