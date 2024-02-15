from fastapi import FastAPI
import requests

app = FastAPI()
# Den her skal tages fra Server A (app.js)
# // for at see resultet se: http://127.0.0.1:8000/requestexpress
@app.get("/fastapiData")
def _():
    return {"message": [1, 2, 3, 4, 8] }

# Den her tager fra app.js (Server A)
# kør først poetry shell
# derefter uvicorn main_Server_B:app
# For at se http://127.0.0.1:8000/requestexpress
@app.get("/requestexpress")
def get_express_data():
    response = requests.get("http://127.0.0.1:8080/expressData").json()
    return { "data": response }