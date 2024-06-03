# opretter_FastApi_app

from fastapi import FastAPI
import json

app = FastAPI()

from routers import spacecraft_router
app.include_router(spacecraft_router)



