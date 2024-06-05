# opretter_FastApi_app

#from fastapi import FastAPI
#import json

#app = FastAPI()

#from routers import spacecraft_router
#app.include_router(spacecraft_router)



#For at starte applikationen:
# uvicorn main:app --reload
# Når appen startes genereres dokumentationen



from fastapi import FastAPI
import json
from routers import spacecraft_router
from fastapi.openapi.utils import get_openapi

app = FastAPI()

# bruger spacecraft_router
app.include_router(spacecraft_router)

# Generer og gemmer OpenAPI ved start. kan ses i openapi.json
@app.on_event("startup")
async def generate_openapi_json():
    openapi_schema = get_openapi(
        title="FastAPI Spacecraft App",
        version="1.0.0",
        description="API for managing spacecrafts",
        routes=app.routes,
    ) #opretter filen openapi.json
    with open("openapi.json", "w") as f:
        json.dump(openapi_schema, f, indent=2)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
